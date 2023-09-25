import { createEvent, createStore, sample } from 'effector'
import { Account } from 'starknet'
import { persist } from 'effector-storage/local'
import type { RawAccount, UpdateAccountPayload } from './types'
import { starknetManager } from '@/shared/lib'

const $accounts = createStore<Account[]>([])
const $rawAccounts = createStore<RawAccount[]>([])
const $hasAccounts = $rawAccounts.map(({ length }) => length > 0)

const updateAccountCalled = createEvent<UpdateAccountPayload>()
const addAccountsCalled = createEvent<RawAccount[]>()

sample({
  clock: addAccountsCalled,
  source: $rawAccounts,
  fn: (accounts, newAccounts) => [...newAccounts, ...accounts],
  target: $rawAccounts,
})
sample({
  clock: updateAccountCalled,
  source: $rawAccounts,
  fn: (accounts, { contractAddress, payload }) => accounts.map((account) => {
    if (account.contractAddress === contractAddress)
      return { ...account, ...payload }
    return account
  }),
  target: $rawAccounts,
})

// refresh accounts on provider or accounts data change
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

export const accountsManager = {
  accounts: $accounts,
  rawAccounts: $rawAccounts,
  hasAccounts: $hasAccounts,
  addAccounts: addAccountsCalled,
  updateAccount: updateAccountCalled,
}

persist({ store: $rawAccounts, key: 'starknet-accounts' })
