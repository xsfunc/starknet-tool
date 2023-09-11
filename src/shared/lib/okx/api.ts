import { createMutation } from '@farfetched/core'
import { getSignature } from './methods'
import type { Withdrawal } from './types'

const baseUrl = 'https://www.okx.com'

export const withdrawMutation = createMutation({
  handler: async ({ credentials, ...body }: Withdrawal) => {
    const endpoint = '/api/v5/asset/withdrawal'
    const { signature, timestamp } = await getSignature({
      apiSecret: credentials.apiSecret,
      method: 'POST',
      endpoint,
      body,
    })

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      {
        method: 'POST',
        headers: {
          'OK-ACCESS-KEY': credentials.apiKey,
          'OK-ACCESS-PASSPHRASE': credentials.apiPassphrase,
          'OK-ACCESS-SIGN': signature,
          'OK-ACCESS-TIMESTAMP': timestamp,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
      .catch((e) => {
        console.error(e)
        return e
      })

    return response.json()
  },
})

export const api = {
  withdraw: withdrawMutation,
}
