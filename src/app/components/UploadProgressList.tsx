'use client'

import type { BatchUploadItem } from '@/lib/uploadImage'

type Props = {
  items: BatchUploadItem[]
  onRetry?: () => void
  isBusy?: boolean
}

const STATUS_LABEL: Record<BatchUploadItem['status'], string> = {
  pending: 'Čaká',
  uploading: 'Nahrávam…',
  success: 'Hotovo',
  failed: 'Zlyhalo',
}

const STATUS_COLOR: Record<BatchUploadItem['status'], string> = {
  pending: '#9b8f84',
  uploading: '#e0a800',
  success: '#4ade80',
  failed: '#fca5a5',
}

export default function UploadProgressList({ items, onRetry, isBusy }: Props) {
  if (items.length === 0) return null

  const failedCount = items.filter((i) => i.status === 'failed').length
  const successCount = items.filter((i) => i.status === 'success').length

  return (
    <div className="mt-3 p-4" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }}>
      <p
        className="text-sm mb-2"
        style={{
          fontFamily: 'var(--font-poiret-one)',
          color: '#9b8f84',
          letterSpacing: '0.15em',
          fontSize: '11px',
          textTransform: 'uppercase',
        }}
      >
        Stav nahrávania ({successCount}/{items.length} hotových
        {failedCount > 0 ? `, ${failedCount} zlyhalo` : ''})
      </p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={`${item.file.name}-${idx}`}
            className="flex items-start gap-3 text-xs"
            style={{ color: '#faf8f5' }}
          >
            <span
              style={{ color: STATUS_COLOR[item.status], minWidth: 80 }}
              className="font-bold uppercase tracking-wider"
            >
              {STATUS_LABEL[item.status]}
            </span>
            <span className="flex-1 break-all">
              <span style={{ color: '#faf8f5' }}>{item.file.name}</span>
              {item.error && (
                <span className="block mt-1" style={{ color: '#fca5a5' }}>
                  {item.error}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {failedCount > 0 && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={isBusy}
          className="mt-3 py-2 px-4 tracking-[0.15em] uppercase text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
          style={{
            fontFamily: 'var(--font-poiret-one)',
            background: 'transparent',
            border: '1px solid #e80e19',
            color: '#fca5a5',
          }}
        >
          Skúsiť znova ({failedCount})
        </button>
      )}
    </div>
  )
}
