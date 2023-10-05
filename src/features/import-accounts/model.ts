import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import { createEffect, sample } from 'effector'
import { type Provider } from 'starknet'
import { createModal, notify, starknetManager, starknetUtils } from '@/shared/lib'
import { accountsManager } from '@/entities/accounts'

const importAccountsFx = createEffect(importAccountsByPK)

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
  source: starknetManager.provider,
  fn: (provider, { privateKeys }) => ({
    privateKeys: privateKeys.trim().split('\n'),
    provider,
  }),
  target: [
    dialog.close,
    importAccountsFx,
  ],
})

sample({
  clock: importAccountsFx.doneData,
  fn: accounts => accounts.map(account => ({
    ...account,
    encrypted: false,
    status: 'created',
    contractType: 'argent-x',
  }) as const),
  target: accountsManager.addAccounts,
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

interface ImportAccountsProps {
  privateKeys: string[]
  provider: Provider
}

async function importAccountsByPK({
  privateKeys,
  provider,
}: ImportAccountsProps) {
  const accounts = []
  for await (const privateKey of privateKeys) {
    const account = await starknetUtils.createAccountWithPK({ find: true, provider, privateKey })
    accounts.push(account)
  }
  return accounts
}
