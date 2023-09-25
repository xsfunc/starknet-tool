import { sample } from 'effector'
import type { Event } from 'effector'
import type { Account } from 'starknet'
import { accountsManager } from '.'
import { starknetManager } from '@/shared/lib'

interface WithAccountAddress {
  accountAddress: string
  [key: string]: any
}

export function withAccount<T extends WithAccountAddress>(clock: Event<T>) {
  return sample({
    clock,
    source: {
      accounts: accountsManager.accounts,
      provider: starknetManager.provider,
    },
    filter: ({ accounts }, params) => accounts.find(acc => acc.address === params.accountAddress) !== undefined,
    fn: ({ accounts, provider }, params) => {
      const account = accounts.find(acc => acc.address === params.accountAddress) as Account
      return { provider, ...params, account }
    },
  })
}
