import { createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'
import { hash } from '@/shared/lib'
import { settings } from '@/entities/settings'
import { session } from '@/shared/session'
import { routes } from '@/shared/config'

const checkPasswordFx = createEffect(checkPassword)
const lockCalled = createEvent()

export { lockCalled as logout }
export const authWithPasswordForm = createForm({
  fields: {
    password: {
      init: '' as string,
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
        },
      ],
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: authWithPasswordForm.formValidated,
  source: settings.security.passwordHash,
  fn: (passwordHash, { password }) => ({ password, passwordHash }),
  target: checkPasswordFx,
})
sample({
  clock: checkPasswordFx.doneData,
  filter: result => !result,
  fn: () => ({ rule: 'incorrect-password', errorText: 'Incorrect password' }),
  target: authWithPasswordForm.fields.password.addError,
})
sample({
  clock: checkPasswordFx.doneData,
  filter: result => result,
  target: [
    session.isAuthorized,
    routes.accounts.open,
    authWithPasswordForm.reset,
  ],
})

sample({
  clock: lockCalled,
  fn: () => false,
  target: [session.isAuthorized, routes.password.open],
})

interface CheckPasswordProps { password: string; passwordHash: string }
async function checkPassword({ password, passwordHash }: CheckPasswordProps) {
  const authPasswordHash = await hash(password)
  return authPasswordHash === passwordHash
}
