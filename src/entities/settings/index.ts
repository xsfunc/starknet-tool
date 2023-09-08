import { createEvent, createStore, sample } from 'effector'
import { constants } from 'starknet'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'
import { type ProviderPayload, type ProviderType, starknetManager } from '@/shared/lib'

const $provider = createStore<ProviderPayload>({
  type: 'sequencer',
  url: constants.NetworkName.SN_MAIN,
})

const $password = createStore('')
const changePasswordCalled = createEvent<string>()

export const providerForm = createForm({
  fields: {
    type: {
      init: 'sequencer' as ProviderType,
    },
    url: {
      init: '' as string,
    },
  },
  validateOn: ['submit'],
})

sample({
  clock: providerForm.formValidated,
  filter: (p: ProviderPayload | null): p is ProviderPayload => Boolean(p),
  target: $provider,
})
sample({
  clock: $provider,
  target: [
    starknetManager.changeProvider,
    providerForm.setForm,
  ],
})

export const settings = {
  password: $password,
  changePassword: changePasswordCalled,
}

persist({ store: $provider, key: 'starknet-provider' })
