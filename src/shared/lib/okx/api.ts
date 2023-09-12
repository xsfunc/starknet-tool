import { createMutation } from '@farfetched/core'
import { authHeaders } from './methods'
import type { Credentials, Withdrawal } from './types'

const baseUrl = 'https://www.okx.com'

export const withdrawMutation = createMutation({
  handler: async ({ credentials, ...body }: Withdrawal) => {
    const method = 'POST'
    const endpoint = '/api/v5/asset/withdrawal'
    const { headers } = await authHeaders({
      credentials,
      endpoint,
      method,
    })

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      {
        method,
        headers,
        body: JSON.stringify(body),
      },
    )
    return response.json()
  },
})

export const balancesQuery = createMutation({
  handler: async (credentials: Credentials) => {
    const method = 'GET'
    const endpoint = '/api/v5/asset/balances?ccy=ETH'
    const { headers } = await authHeaders({
      credentials,
      endpoint,
      method,
    })

    const response = await fetch(
      `${baseUrl}${endpoint}`,
      { method, headers },
    )
    return response.json()
  },
})

export const api = {
  withdraw: withdrawMutation,
  balances: balancesQuery,
}
