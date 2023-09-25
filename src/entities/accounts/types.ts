export interface RawAccount {
  privateKey: string
  publicKey: string
  contractAddress: string
  contractType: 'argent-x' | 'braavos'
  status: 'created' | 'deployed'
  encrypted: boolean
  ethBalance?: number
}

export interface UpdateAccountPayload {
  contractAddress: string
  payload: Partial<RawAccount>
}

export interface AccountAction {
  address: string
}
