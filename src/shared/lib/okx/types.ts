export interface Credentials {
  apiKey: string
  apiSecret: string
  apiPassphrase: string
}

// WebSocket types
type Channel = 'withdrawal-info'

export interface LoginProps {
  socket: WebSocket
  credentials: Credentials
}

export type SubscriptionArg = WithdrawalSubscriptionArg
export interface UnSubscribeFxProps { socket: WebSocket; args: SubscriptionTopic[] }
export interface SubscribeFxProps { socket: WebSocket; args: SubscriptionArg[] }
export interface WithdrawalSubscriptionArg {
  channel: Channel
  ccy?: string
}
export interface SubscriptionTopic {
  channel: Channel
  instType?: string
  instFamily?: string
  instId?: string
}

export interface ReceivedMessage {
  event: string
  code?: string
  arg?: MessageArg
  data?: WithdrawMessage[]
}

export interface MessageArg {
  channel: Channel
  uid: string
}

export interface WithdrawMessage {
  uid: string
  addrEx: null
  amt: string
  ccy: string
  chain: string
  to: string
  txId: string
  subAcct: string
  fee: string
  feeCcy: string
  areaCodeFrom: string
  areaCodeTo: string
  from: string
  memo: string
  clientId: string
  wdId: string
}
