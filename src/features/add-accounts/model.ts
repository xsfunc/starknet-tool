import { createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'
import { accountsModel } from '@/entities/accounts'
import { argentXManager, createArgentXAccount } from '@/shared/lib'
import type { RawAccount } from '@/entities/accounts/types'

const addAccountCalled = createEvent()

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
  clock: addAccountCalled,
  source: argentXManager.accountConfig,
  fn: (config): RawAccount[] => {
    const account = createArgentXAccount(config)
    return [{ ...account, status: 'created', encrypted: false }]
  },
  target: accountsModel.addAccounts,
})
// sample({
//   clock: addAccountsForm.formValidated,
//   source: {
//     argentX: argentXManager,
//     starknet: starknetManager,
//     accounts: accountsModel.rawAccounts,
//   },
//   fn: (source, params) => ({ ...source, params }),
//   target: addAccountsFx,
// })

export const addAccount = addAccountCalled
