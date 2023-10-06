import type { EventPayload } from 'effector'
import { createEvent, createStore, sample } from 'effector'
import { Account } from 'starknet'
import { persist } from 'effector-storage/local'
import type { AccountData, UpdateAccountPayload } from './types'
import { notify, starknetManager } from '@/shared/lib'

const $accounts = createStore<Account[]>([])
const $rawAccounts = createStore<AccountData[]>([])
const $hasAccounts = $rawAccounts.map(({ length }) => length > 0)

const updateAccountCalled = createEvent<UpdateAccountPayload>()
const addAccountsCalled = createEvent<AccountData[]>()

sample({
  clock: addAccountsCalled,
  source: $rawAccounts,
  fn: (accounts, newAccounts) => [...newAccounts, ...accounts],
  target: [
    notify.prepend(accountsAddedMessage),
    $rawAccounts,
  ],
})
sample({
  clock: updateAccountCalled,
  source: $rawAccounts,
  fn: (accounts, { contractAddress, payload }) => accounts.map(
    account => (account.contractAddress === contractAddress)
      ? ({ ...account, ...payload })
      : account,
  ),
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
  addAccount: addAccountsCalled.prepend((account: AccountData) => [account]),
}

persist({ store: $rawAccounts, key: 'starknet-accounts' })

function accountsAddedMessage(): EventPayload<typeof notify> {
  return { message: 'Accounts added.', type: 'success' }
}
