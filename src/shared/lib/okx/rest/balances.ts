import type { Credentials } from '..'
import { authHeaders, baseUrl } from '../utils'

interface CurrencyBalanceData {
  availBal: string
  bal: string
  ccy: string
  frozenBal: string
}

export interface BalancesRequestProps {
  credentials: Credentials
  currencies: string[]
}

export interface BalancesResponse {
  code: string
  msg: string
  data: CurrencyBalanceData[]
}

export async function balances({ credentials, currencies }: BalancesRequestProps): Promise<BalancesResponse> {
  const method = 'GET'
  const ccy = currencies.join(',')
  const endpoint = `/api/v5/asset/balances?ccy=${ccy}`
  const { headers } = await authHeaders({
    credentials,
    endpoint,
    method,
  })

  const response = await fetch(`${baseUrl}${endpoint}`, { method, headers })
  return response.json()
}
