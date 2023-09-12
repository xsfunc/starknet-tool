import type { StoreValue } from 'effector'
import { createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'
import { attachOperation } from '@farfetched/core'
import { notify, okx } from '@/shared/lib'

type CredentialsStore = StoreValue<typeof $credentials>

const updateCredentialsCalled = createEvent<Partial<CredentialsStore>>()

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
  fn: ({ result }) => {
    const formatter = new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 4 })
    const balance = formatter.format(Number(result.data[0].availBal))
    const message = `Saved. Available balance: ${balance}ETH`
    return {
      options: { duration: 3500 },
      type: 'success',
      message,
    } as const
  },
  target: notify,
})
sample({
  clock: getBalances.finished.success,
  source: okxCredentialsForm.formValidated,
  fn: credentials => ({ ...credentials, isValid: true, encrypted: false }),
  target: $credentials,
})
sample({
  clock: $credentials,
  target: okxCredentialsForm.setForm,
})

persist({ store: $credentials, key: 'okx-credentials' })
