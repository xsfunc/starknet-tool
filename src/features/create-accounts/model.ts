import { createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'
import { accountsManager } from '@/entities/accounts'
import { argentXManager, createArgentXAccount } from '@/shared/lib'
import type { RawAccount } from '@/entities/accounts/types'

const createAccountCalled = createEvent()

export const addAccountsForm = createForm({
  fields: {
    count: {
      init: '1',
    },
    tags: {
      init: '' as string,
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: createAccountCalled,
  source: argentXManager.accountConfig,
  fn: (config): RawAccount[] => {
    const account = createArgentXAccount(config)
    return [{
      ...account,
      status: 'created',
      contractType: 'argent-x',
      encrypted: false,
    }]
  },
  target: accountsManager.addAccounts,
})

export const createAccount = createAccountCalled
