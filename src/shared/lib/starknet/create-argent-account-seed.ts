import * as mStarknet from '@scure/starknet'
import * as bip32 from '@scure/bip32'
import * as bip39 from '@scure/bip39'
import type { Provider } from 'starknet'
import { createAccountWithPK } from './create-argent-account-pk'

type SeedAccount = Awaited<ReturnType<typeof createAccountWithPK>> & {
  HDPathIndex: number
  source: 'seed'
}

interface Params {
  accountsCount: number
  HDPathOffset: number
  HDPath: string
  mnemonic: string
  provider: Provider
}

export async function createAccountsWithSeed({
  accountsCount,
  mnemonic,
  HDPath,
  HDPathOffset,
  provider,
}: Params) {
  const masterSeed = bip39.mnemonicToSeedSync(mnemonic)
  const HDKey1 = bip32.HDKey.fromMasterSeed(masterSeed).derive('m/44\'/60\'/0\'/0/0')
  const HDKey2 = bip32.HDKey.fromMasterSeed(HDKey1.privateKey!)
  const accountsFn = Array(accountsCount).fill(HDPathOffset)

  const accounts = await Promise.all(
    accountsFn.map(async (offset, index): Promise<SeedAccount> => {
      const HDPathIndex = index + offset as number
      const HDKey = HDKey2.derive(HDPath + String(HDPathIndex))
      const privateKey = `0x${mStarknet.grindKey(HDKey.privateKey!)}`
      const accountData = await createAccountWithPK({
        find: true,
        privateKey,
        provider,
      })
      return {
        ...accountData,
        HDPathIndex,
        source: 'seed',
      }
    }),
  )

  return accounts
}
