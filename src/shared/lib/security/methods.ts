const encryptAlgo = { name: 'AES-GCM', length: 256 }
const deriveAlgo = { name: 'PBKDF2', iterations: 250000, hash: 'SHA-256' }

export async function encryptWithPassword(password: string, data: string) {
  const encoder = new TextEncoder()
  const key = await keyFromPassword(password)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedData = await crypto.subtle.encrypt(
    { name: encryptAlgo.name, iv },
    key,
    encoder.encode(data),
  )
  return {
    data: bufferToBase64(encryptedData),
    iv: bufferToBase64(iv),
  }
}

export async function decryptWithPassword(password: string, encryptedData: string, iv: string) {
  const decoder = new TextDecoder()
  const key = await keyFromPassword(password)
  const decryptedData = await crypto.subtle.decrypt(
    { name: encryptAlgo.name, iv: base64ToUint8Array(iv) },
    key,
    base64ToUint8Array(encryptedData),
  )
  return decoder.decode(decryptedData)
}

export async function hash(data: string) {
  const encoder = new TextEncoder()
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(data))
  return bufferToBase64(digest)
}

async function keyFromPassword(password: string) {
  const encoder = new TextEncoder()
  const salt = encoder.encode(password.length.toString())
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    deriveAlgo.name,
    false,
    ['deriveKey'],
  )
  return crypto.subtle.deriveKey(
    { ...deriveAlgo, salt },
    passwordKey,
    encryptAlgo,
    false,
    ['encrypt', 'decrypt'],
  )
}

function bufferToBase64(buffer: ArrayBuffer) {
  btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

function base64ToUint8Array(data: string) {
  const binaryString = atob(data)
  const uint8Array = new Uint8Array(binaryString.length)
  return uint8Array.map((_, i) => binaryString.charCodeAt(i))
}
