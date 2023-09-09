export interface Credentials {
  apiKey: string
  apiSecret: string
  apiPassphrase: string
}

export interface Withdrawal {
  credentials: Credentials
  ccy: 'ETH'
  amt: string
  dest: InternalTransfer | OnChainWithdrawal
  toAddr: string
  fee: string
  chain: 'ETH-StarkNet'
  walletType: 'private'
}

type InternalTransfer = '3'
type OnChainWithdrawal = '4'
