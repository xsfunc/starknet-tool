import { invoke } from '@withease/factories'
import { createForm } from 'effector-forms'
import type { EventPayload } from 'effector'
import { createEffect, sample } from 'effector'
import type { Provider } from 'starknet'
import { createModal, notify, starknetManager, starknetUtils } from '@/shared/lib'
import { accountsManager } from '@/entities/accounts'

const importAccountsFx = createEffect(importAccountsByPK)
const dialog = invoke(createModal<void>)
const privateKeysForm = createForm({
  fields: {
    privateKeys: {
      init: '' as string,
      rules: [
        {
          name: 'required',
          validator: value => ({
            isValid: Boolean(value),
            errorText: 'At least one private key required',
          }),
        },
      ],
    },
  },
})

sample({
  clock: privateKeysForm.formValidated,
  source: starknetManager.provider,
  fn: (provider, { privateKeys }) => ({
    privateKeys: privateKeys.trim().split('\n'),
    provider,
  }),
  target: [
    dialog.close,
    importAccountsFx,
    privateKeysForm.reset,
  ],
})

// sample({
//   clock: importAccountsFx.doneData,
//   fn: accounts => accounts.map(account => ({
//     ...account,
//     encrypted: false,
//     status: 'created',
//     contractType: 'argent-x',
//   }) as const),
//   target: accountsManager.addAccounts,
// })

sample({
  clock: importAccountsFx.failData,
  target: notify.prepend(errorWhileAddingAccounts),
})

export const importAccounts = {
  form: privateKeysForm,
  dialog,
}

interface ImportAccountsProps {
  privateKeys: string[]
  provider: Provider
}

async function importAccountsByPK({ privateKeys, provider }: ImportAccountsProps) {
  const uniqKeys = [...new Set(privateKeys)]
  // const accounts = []
  for await (const privateKey of uniqKeys) {
    const account = await starknetUtils.createAccountWithPK({ find: true, provider, privateKey })
    accountsManager.addAccount(account)
    // accounts.push(account)
  }
  // return accounts
}

function errorWhileAddingAccounts(
  error: EventPayload<typeof importAccountsFx.failData>,
): EventPayload<typeof notify> {
  return {
    message: `Error: ${error.message}`,
    type: 'error',
  }
}
