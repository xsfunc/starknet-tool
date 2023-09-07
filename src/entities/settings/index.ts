import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { starknetManager } from '@/shared/lib'
import type { ProviderPayload } from '@/shared/lib'

const $provider = createStore<ProviderPayload | null>(null)
const $password = createStore('')

const changeProviderCalled = createEvent<ProviderPayload>()
const changePasswordCalled = createEvent<string>()

sample({
  clock: changeProviderCalled,
  target: $provider,
})
sample({
  clock: $provider,
  filter: (p: ProviderPayload | null): p is ProviderPayload => Boolean(p),
  target: starknetManager.changeProvider,
})

export const settings = {
  changeProvider: changeProviderCalled,
  changePassword: changePasswordCalled,
  password: $password,
}

persist({ store: $provider, key: 'starknet-provider' })
