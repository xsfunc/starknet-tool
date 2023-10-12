export type AccountData = BaseAccountData | EncryptedAccountData

export interface BaseAccountData {
  privateKey: string
  publicKey: string
  contractAddress: string
  contractType: 'argent-x' | 'braavos'
  cairoVersion?: 0 | 1 | 2
  note?: string
  ethBalance?: number
  source: 'seed' | 'pk'
  sourceUuid?: string
  HDPathIndex?: number
  deployed?: boolean
}

interface EncryptedAccountData extends BaseAccountData {
  iv: string
  encrypted: true
}

export interface UpdateAccountPayload {
  contractAddress: string
  payload: Partial<AccountData>
}

export interface AccountAction {
  address: string
}
