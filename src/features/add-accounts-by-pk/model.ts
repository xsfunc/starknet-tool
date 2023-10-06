import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'
import { accountsManager } from '@/entities/accounts'
import { starknetUtils } from '@/shared/lib'

const addAccountCalled = createEvent()
const addAccountFx = createEffect(createAccounts)

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
  target: addAccountFx,
})
sample({
  clock: addAccountFx.doneData,
  target: accountsManager.addAccount,
})

export const addAccount = addAccountCalled

function createAccounts() {
  return starknetUtils.createAccountWithPK({ find: false })
}
