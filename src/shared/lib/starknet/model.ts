import { createEvent, createStore, sample } from 'effector'
import { Provider, constants } from 'starknet'
import { persist } from 'effector-storage/local'
import type { AccountData, ProviderPayload } from './types'

const $provider = createStore(getProvider())
const $privateKeys = createStore<string[]>([])
const $accounts = createStore<AccountData[]>([])

const addAccountCalled = createEvent<AccountData>()
const changeProviderCalled = createEvent<ProviderPayload>()

sample({
  clock: addAccountCalled,
  source: $accounts,
  fn: (accounts, account) => [...accounts, account],
  target: $accounts,
})
sample({
  clock: changeProviderCalled,
  fn: getProvider,
  target: $provider,
})

export const starknetManager = {
  provider: $provider,
  privateKeys: $privateKeys,
  accounts: $accounts,
  addAccount: addAccountCalled,
  changeProvider: changeProviderCalled,
}

persist({ store: $accounts, key: 'starknet-accounts' })

function getProvider(payload?: ProviderPayload): Provider {
  const network = constants.NetworkName.SN_MAIN
  if (!payload) {
    return new Provider({
      sequencer: { network },
    })
  }

  if (payload.type === 'rpc') {
    return new Provider({
      rpc: { nodeUrl: payload.url },
    })
  }

  return new Provider({
    sequencer: {
      // @ts-expect-error: need add network validation
      network: payload.url,
    },
  })
}
