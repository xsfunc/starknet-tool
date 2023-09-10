import { createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'

export const $credentials = createStore({
  apiKey: '',
  apiSecret: '',
  apiPassphrase: '',
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
  clock: okxCredentialsForm.formValidated,
  target: $credentials,
})
sample({
  clock: $credentials,
  target: okxCredentialsForm.setForm,
})

persist({ store: $credentials, key: 'okx-credentials' })
