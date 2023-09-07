import { createStore, sample } from 'effector'
import { Account } from 'starknet'
import { starknetManager } from '@/shared/lib'

const $accounts = createStore<Account[]>([])

sample({
  source: {
    accounts: starknetManager.accounts,
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
