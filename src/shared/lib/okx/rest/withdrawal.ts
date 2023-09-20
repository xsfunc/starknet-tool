import type { Credentials } from '..'
import { authHeaders, baseUrl } from '../utils'

export interface WithdrawalQueryProps {
  credentials: Credentials
  ccy: 'ETH'
  amt: string
  dest: InternalTransfer | OnChainWithdrawal
  toAddr: string
  fee: string
  chain: 'ETH-Starknet'
  walletType: 'private'
}
interface WithdrawalResponseData {
  amt: string
  wdId: string
  ccy: string
  clientId: string
  chain: string
}
export interface WithdrawalResponse {
  code: string
  msg: string
  data: WithdrawalResponseData[]
}

type InternalTransfer = '3'
type OnChainWithdrawal = '4'

export async function withdrawal({ credentials, ...body }: WithdrawalQueryProps): Promise<WithdrawalResponse> {
  const method = 'POST'
  const endpoint = '/api/v5/asset/withdrawal'
  const { headers } = await authHeaders({
    credentials,
    endpoint,
    method,
    body,
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
}
