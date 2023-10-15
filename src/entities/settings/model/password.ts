import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'
import { invoke } from '@withease/factories'
import { createModalDialog, hash, notify } from '@/shared/lib'

const createPasswordHashFx = createEffect(hash)
const resetPassword = createEvent()
const changePasswordHashCalled = createEvent<string>()

const $password = createStore('')
const $passwordHash = createStore('').reset(resetPassword)
const $usePassword = $passwordHash.map(hash => hash !== '')

export const erasePasswordDialog = invoke(createModalDialog<void>)
export const passwordForm = createForm({
  fields: {
    password: {
      init: '' as string,
      rules: [
        {
          name: 'minLength',
          validator: value => ({
            isValid: Boolean(value),
            errorText: 'Password required',
          }),
        },
      ],
    },
    confirmPassword: {
      init: '' as string,
      rules: [
        {
          name: 'confirmation',
          validator: (confirmation, { password }) => ({
            isValid: confirmation === password,
            errorText: 'Password mismatch',
          }),
        },
      ],
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: passwordForm.formValidated,
  fn: ({ password }) => password,
  target: $password,
})
sample({
  clock: $password,
  target: createPasswordHashFx,
})
sample({
  clock: changePasswordHashCalled,
  target: $passwordHash,
})
sample({
  clock: createPasswordHashFx.doneData,
  target: [
    $passwordHash,
    passwordForm.reset,
    notify.prepend(() => ({ message: 'Password changed', type: 'success' })),
  ],
})

sample({
  clock: erasePasswordDialog.submitted,
  target: resetPassword,
})

export const passwordSettings = {
  password: $password,
  passwordHash: $passwordHash,
  changePasswordHash: changePasswordHashCalled,
  usePassword: $usePassword,
  resetPassword,
}

persist({ store: $passwordHash, key: 'security-password-hash' })
