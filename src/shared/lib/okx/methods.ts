interface SignatureProps {
  apiSecret: string
  method: 'GET' | 'POST'
  body: object
  endpoint: string
}

export async function getSignature({ apiSecret, method, body, endpoint }: SignatureProps) {
  const encoder = new TextEncoder()
  const algorithm = { name: 'HMAC', hash: 'SHA-256' }

  const timestamp = new Date().toISOString()
  const data = timestamp + method + endpoint + JSON.stringify(body)
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
