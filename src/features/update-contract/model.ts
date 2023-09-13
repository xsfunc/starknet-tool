import { createEffect, createEvent, sample } from 'effector'
import type { Provider } from 'starknet'
import { Account, Contract, num } from 'starknet'
import { notify, starknetManager } from '@/shared/lib'
import type { RawAccount } from '@/entities/accounts'
import { accountsModel } from '@/entities/accounts'

const upgradeArgentAccountFx = createEffect(updateArgentAccount)
const upgradeAccountContractCalled = createEvent<string>()

sample({
  clock: upgradeAccountContractCalled,
  source: {
    provider: starknetManager.provider,
    accounts: accountsModel.rawAccounts,
  },
  fn: ({ provider, accounts }, contractAddress) => {
    const account = accounts.find(acc => acc.contractAddress === contractAddress) as RawAccount
    return { provider, ...account }
  },
  target: upgradeArgentAccountFx,
})

sample({
  clock: upgradeArgentAccountFx,
  fn: () => ({
    message: 'Upgrade transaction sent.',
    type: 'success',
  } as const),
  target: notify,
})

export const upgradeAccount = upgradeAccountContractCalled

async function updateArgentAccount({
  provider,
  contractAddress,
  privateKey,
}: {
  provider: Provider
  contractAddress: string
  privateKey: string
}) {
  const newImplementation = '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003'
  const accountClass = await provider.getClassAt(contractAddress)
  const accountContract = new Contract(accountClass.abi, contractAddress, provider)
  const accountContractImplementation = await accountContract.get_implementation()
  const accountClassImplementationHash = num.toHex(accountContractImplementation.implementation)

  const accountImplementationClass = await provider.getClassByHash(accountClassImplementationHash)
  const accountImplementationContract = new Contract(accountImplementationClass.abi, contractAddress, provider)
  const { calldata } = accountImplementationContract.populate('upgrade', {
    implementation: newImplementation,
    calldata: [0],
  })

  const account = new Account(provider, contractAddress, privateKey)
  accountImplementationContract.connect(account)
  const { transaction_hash: txHash } = await accountImplementationContract.upgrade(calldata)
  return txHash
}
