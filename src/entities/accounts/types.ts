export interface RawAccount {
  privateKey: string
  publicKey: string
  contractAddress: string
  contractType: 'argent-x' | 'braavos'
  status: 'created' | 'deployed'
  encrypted: boolean
}

export interface AccountAction {
  address: string
}
