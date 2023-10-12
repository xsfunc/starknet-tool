export type ProviderType = 'rpc' | 'sequencer'
export interface ProviderPayload {
  type: ProviderType
  url: string
}

export interface AccountData {
  privateKey: string
  publicKey: string
  contractAddress: string
  contractType: 'argent-x'
  source: 'pk' | 'seed'
  cairoVersion: 0 | 1 | 2
  deployed?: boolean
}
