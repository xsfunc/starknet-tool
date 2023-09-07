export interface AccountData {
  contractAddress: string
  publicKey: string
  privateKey: string
}

export interface ProviderPayload {
  type: 'rpc' | 'sequencer'
  url: string
}
