import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { Account } from 'starknet'
import { persist } from 'effector-storage/local'
import type { RawAccount } from './types'
import { downloadAccounts } from './methods'
import { starknetManager } from '@/shared/lib'

const $accounts = createStore<Account[]>([])
const $rawAccounts = createStore<RawAccount[]>([])

const downloadAccountsFx = createEffect(downloadAccounts)
const addAccountsCalled = createEvent<RawAccount[]>()

sample({
  clock: addAccountsCalled,
  source: $rawAccounts,
  fn: (accounts, newAccounts) => [...newAccounts, ...accounts],
  target: $rawAccounts,
})
sample({
  source: {
    accounts: $rawAccounts,
    provider: starknetManager.provider,
  },
  fn: ({
    accounts,
    provider,
  }) => accounts.map(
    acc => new Account(provider, acc.contractAddress, acc.privateKey),
  ),
  target: $accounts,
})

export const accountsModel = {
  rawAccounts: $rawAccounts,
  addAccounts: addAccountsCalled,
  downloadAccounts: attach({
    source: { accounts: $rawAccounts },
    effect: downloadAccountsFx,
  }),
}

persist({ store: $rawAccounts, key: 'starknet-accounts' })
