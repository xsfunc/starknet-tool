import { createEvent, createStore, sample } from 'effector'
import { constants } from 'starknet'
import { createForm } from 'effector-forms'
import { persist } from 'effector-storage/local'
import { type ProviderPayload, type ProviderType, starknetManager } from '@/shared/lib'
import { routes } from '@/shared/config'

const changeCalled = createEvent<ProviderPayload>()
const $provider = createStore<ProviderPayload>({
  type: 'sequencer',
  url: constants.NetworkName.SN_MAIN,
})

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

export const starknetProvider = {
  instance: $provider,
  change: changeCalled,
}

sample({
  clock: changeCalled,
  target: $provider,
})
sample({
  clock: providerForm.formValidated,
  filter: (p: ProviderPayload | null): p is ProviderPayload => Boolean(p),
  target: $provider,
})
sample({
  clock: [$provider, routes.settings.opened],
  source: $provider,
  target: [
    starknetManager.changeProvider,
    providerForm.setForm,
  ],
})

persist({ store: $provider, key: 'starknet-provider' })
