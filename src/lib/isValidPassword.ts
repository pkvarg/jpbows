export async function isValidPassword(password: string, hashedPassword: string) {
  //console.log('result', (await hashPassword(password)) === hashedPassword)
  //console.log('password', password)
  //console.log('generate', await hashPassword(password))
  return (await hashPassword(password)) === hashedPassword
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(password))

  return Buffer.from(arrayBuffer).toString('base64')
}
