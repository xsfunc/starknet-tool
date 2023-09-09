import { createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'

const $okxCredentials = createStore({
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
  target: $okxCredentials,
})
sample({
  clock: $okxCredentials,
  target: okxCredentialsForm.setForm,
})

persist({ store: $okxCredentials, key: 'okx-credentials' })
