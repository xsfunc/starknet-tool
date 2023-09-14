import type { StoreValue } from 'effector'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'
import { attachOperation } from '@farfetched/core'
import type { BalancesResponse } from '@/shared/lib'
import { notify, okx } from '@/shared/lib'

type CredentialsStore = StoreValue<typeof $credentials>

const updateCredentialsCalled = createEvent<Partial<CredentialsStore>>()
const notifyFx = createEffect(createNotification)

export const getBalances = attachOperation(okx.api.balances)
export const $credentials = createStore({
  apiKey: '',
  apiSecret: '',
  apiPassphrase: '',
  isValid: false,
  encrypted: false,
})

export const okxCredentialsForm = createForm({
  fields: {
    apiKey: {
      init: '' as string,
    },
    apiSecret: {
      init: '' as string,
    },
    apiPassphrase: {
      init: '' as string,
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: updateCredentialsCalled,
  source: $credentials,
  fn: (state, payload) => ({ ...state, ...payload }),
  target: $credentials,
})
sample({
  clock: okxCredentialsForm.formValidated,
  fn: credentials => ({ credentials, currencies: ['ETH'] }),
  target: getBalances.start,
})
sample({
  clock: getBalances.finished.success,
  source: okxCredentialsForm.formValidated,
  filter: (_, { result }) => result.code === '0',
  fn: credentials => ({ ...credentials, isValid: true, encrypted: false }),
  target: $credentials,
})
sample({
  clock: getBalances.finished.success,
  target: notifyFx,
})
sample({
  clock: $credentials,
  target: okxCredentialsForm.setForm,
})

persist({ store: $credentials, key: 'okx-credentials' })

function createNotification({ result }: { result: BalancesResponse }) {
  if (result.code !== '0') {
    return notify({
      message: 'Incorrect API token',
      options: { duration: 3500 },
      type: 'error',
    })
  }

  const formatter = new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 4 })
  const balance = formatter.format(Number(result.data[0].availBal))
  const message = `Saved. Available balance: ${balance}ETH`
  return notify({
    options: { duration: 3500 },
    type: 'success',
    message,
  })
}
