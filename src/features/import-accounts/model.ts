import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import { createEffect, sample } from 'effector'
import { createModal, notify, starknetUtils } from '@/shared/lib'
import { accountsModel } from '@/entities/accounts'

const importAccountsFx = createEffect(({ privateKeys }: { privateKeys: string[] }) =>
  privateKeys.map(privateKey => starknetUtils.createAccount({ privateKey })))

const form = createForm({
  fields: {
    privateKeys: {
      init: '' as string,
    },
    contractType: {
      init: 'argentX',
    },
  },
})

const dialog = invoke(createModal<void>)

sample({
  clock: form.formValidated,
  fn: ({ privateKeys }) => ({ privateKeys: privateKeys.trim().split('\n') }),
  target: [importAccountsFx, dialog.close],
})

sample({
  clock: importAccountsFx.doneData,
  fn: accounts => accounts.map(account => ({
    ...account,
    encrypted: false,
    status: 'created',
    contractType: 'argent-x',
  }) as const),
  target: accountsModel.addAccounts,
})

sample({
  clock: importAccountsFx.failData,
  fn: ({ message }) => ({
    message: `Error: ${message}`,
    type: 'error',
  } as const),
  target: notify,
})

export const importAccounts = {
  dialog,
  form,
}
