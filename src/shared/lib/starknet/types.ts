export interface AccountData {
  contractAddress: string
  publicKey: string
  privateKey: string
}

export type ProviderType = 'rpc' | 'sequencer'
export interface ProviderPayload {
  type: ProviderType
  url: string
}
