export interface RawAccount {
  privateKey: string
  publicKey: string
  contractAddress: string
  status: 'created' | 'deployed'
  encrypted: boolean
}