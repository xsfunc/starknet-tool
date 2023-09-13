import { createEvent, createStore, sample } from 'effector'
import { Account } from 'starknet'
import { persist } from 'effector-storage/local'
import type { RawAccount } from './types'
import { starknetManager } from '@/shared/lib'

const $accounts = createStore<Account[]>([])
const $rawAccounts = createStore<RawAccount[]>([])
const $hasAccounts = $rawAccounts.map(({ length }) => length > 0)

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
  hasAccounts: $hasAccounts,
  addAccounts: addAccountsCalled,
}

persist({ store: $rawAccounts, key: 'starknet-accounts' })
