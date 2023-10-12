import type { Credentials } from '.'

interface SignatureProps {
  apiSecret: string
  method: 'GET' | 'POST'
  endpoint: string
  body?: object
  customTimestamp?: number
}

export const baseUrl = 'https://www.okx.com'

export async function getSignature({ apiSecret, method, body, endpoint, customTimestamp }: SignatureProps) {
  const encoder = new TextEncoder()
  const algorithm = { name: 'HMAC', hash: 'SHA-256' }

  const timestamp = customTimestamp || new Date().toISOString()
  const bodyString = body === undefined ? '' : JSON.stringify(body)
  const data = timestamp + method + endpoint + bodyString
  const key = await crypto.subtle.importKey('raw', encoder.encode(apiSecret), algorithm, false, ['sign'])

  return crypto.subtle
    .sign(algorithm.name, key, encoder.encode(data))
    .then(signed => ({
      signature: btoa(String.fromCharCode(...new Uint8Array(signed))),
      timestamp,
      endpoint,
      method,
      body,
      data,
    }))
}

interface AuthHeaders {
  credentials: Credentials
  method: 'GET' | 'POST'
  endpoint: string
  body?: object
  customTimestamp?: number
}

export async function authHeaders({ credentials, method, endpoint, body }: AuthHeaders) {
  const { signature, timestamp } = await getSignature({
    apiSecret: credentials.apiSecret,
    method,
    endpoint,
    body,
  })
  return {
    headers: {
      'OK-ACCESS-KEY': credentials.apiKey,
      'OK-ACCESS-PASSPHRASE': credentials.apiPassphrase,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp as string,
      'Content-Type': 'application/json',
    },
  }
}
