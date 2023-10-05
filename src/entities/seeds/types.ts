export type Seed = BaseSeed | EncryptedSeed

interface BaseSeed {
  uuid: string
  mnemonic: string
  HDPath: string
  HDPathOffset: number
}

interface EncryptedSeed extends BaseSeed {
  encrypted: true
  iv: string
}
