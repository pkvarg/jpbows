export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

export type UploadErrorKind = 'too_large' | 'network' | 'server' | 'invalid_response'

export class UploadError extends Error {
  kind: UploadErrorKind
  status: number | null
  serverMessage: string | null
  filename: string

  constructor(opts: {
    kind: UploadErrorKind
    message: string
    filename: string
    status?: number | null
    serverMessage?: string | null
  }) {
    super(opts.message)
    this.name = 'UploadError'
    this.kind = opts.kind
    this.status = opts.status ?? null
    this.serverMessage = opts.serverMessage ?? null
    this.filename = opts.filename
  }
}

export type UploadImageResult = { imageUrl: string }

const formatMb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`

// One token covers a whole batch; a new one is fetched shortly before it expires.
let tokenRequest: Promise<{ token: string; expiresAt: number }> | null = null

const requestUploadToken = async (filename: string) => {
  const response = await fetch('/api/upload-token', { method: 'POST' })
  if (!response.ok) {
    throw new UploadError({
      kind: 'server',
      filename,
      status: response.status,
      message:
        response.status === 401
          ? 'Prihlásenie vypršalo. Prihláste sa znova a nahrajte obrázky ešte raz.'
          : `Nepodarilo sa získať povolenie na nahrávanie (HTTP ${response.status}).`,
    })
  }
  return (await response.json()) as { token: string; expiresAt: number }
}

const getUploadToken = async (filename: string): Promise<string> => {
  const current = tokenRequest ? await tokenRequest.catch(() => null) : null
  if (current && current.expiresAt - 60_000 > Date.now()) return current.token
  tokenRequest = requestUploadToken(filename)
  try {
    return (await tokenRequest).token
  } catch (err) {
    tokenRequest = null
    throw err
  }
}

export async function uploadImage(file: File): Promise<UploadImageResult> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError({
      kind: 'too_large',
      filename: file.name,
      message: `Súbor „${file.name}" (${formatMb(file.size)}) presahuje limit ${formatMb(MAX_UPLOAD_BYTES)}.`,
    })
  }

  const formData = new FormData()
  formData.append('file', file)

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`
  const token = await getUploadToken(file.name)

  let response: Response
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch {
    throw new UploadError({
      kind: 'network',
      filename: file.name,
      message: `Chyba siete pri nahrávaní „${file.name}". Skontrolujte pripojenie a skúste znova.`,
    })
  }

  if (!response.ok) {
    let serverMessage: string | null = null
    try {
      serverMessage = (await response.text()) || null
    } catch {
      // ignore
    }
    const tail = serverMessage ? `: ${serverMessage}` : ''
    throw new UploadError({
      kind: 'server',
      filename: file.name,
      status: response.status,
      serverMessage,
      message: `Nahrávanie „${file.name}" zlyhalo (HTTP ${response.status})${tail}`,
    })
  }

  let data: { imageUrl?: unknown }
  try {
    data = await response.json()
  } catch {
    throw new UploadError({
      kind: 'invalid_response',
      filename: file.name,
      status: response.status,
      message: `Server vrátil neplatnú odpoveď pre „${file.name}".`,
    })
  }

  if (typeof data.imageUrl !== 'string') {
    throw new UploadError({
      kind: 'invalid_response',
      filename: file.name,
      status: response.status,
      message: `V odpovedi servera chýba imageUrl pre „${file.name}".`,
    })
  }

  return { imageUrl: data.imageUrl }
}

export type BatchUploadItem = {
  file: File
  status: 'pending' | 'uploading' | 'success' | 'failed'
  imageUrl?: string
  error?: string
}

export async function uploadImagesBatch(
  files: File[],
  onUpdate: (items: BatchUploadItem[]) => void,
): Promise<BatchUploadItem[]> {
  const items: BatchUploadItem[] = files.map((file) => ({ file, status: 'pending' }))
  onUpdate([...items])

  await Promise.all(
    items.map(async (item, idx) => {
      items[idx] = { ...item, status: 'uploading' }
      onUpdate([...items])
      try {
        const { imageUrl } = await uploadImage(item.file)
        items[idx] = { ...items[idx], status: 'success', imageUrl }
      } catch (err) {
        items[idx] = {
          ...items[idx],
          status: 'failed',
          error: err instanceof Error ? err.message : 'Neznáma chyba',
        }
      }
      onUpdate([...items])
    }),
  )

  return items
}
