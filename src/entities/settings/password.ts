import { createEvent, createStore } from 'effector'

const $passwordHash = createStore('')
const changePasswordCalled = createEvent<string>()

export const passwordSettings = {
  passwordHash: $passwordHash,
  changePassword: changePasswordCalled,
}
