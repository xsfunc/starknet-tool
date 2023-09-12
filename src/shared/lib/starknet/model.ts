import { createEvent, createStore, sample } from 'effector'
import { CallData, Provider, constants, ec, hash, stark } from 'starknet'
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

export const starknetUtils = {
  createAccount,
}

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

function createAccount({ privateKey }: { privateKey?: string }) {
  const proxyClassHash = '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918'
  const accountClassHash = '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2'

  const pk = privateKey || stark.randomAddress()
  const publicKey = ec.starkCurve.getStarkKey(pk)
  const proxyConstructorCallData = constructorCallData(accountClassHash, publicKey)
  const contractAddress = hash.calculateContractAddressFromHash(
    publicKey,
    proxyClassHash,
    proxyConstructorCallData,
    0,
  )
  return {
    publicKey,
    contractAddress,
    privateKey: pk,
  }
}

function constructorCallData(classHash: string, publicKey: string) {
  return CallData.compile({
    implementation: classHash,
    selector: hash.getSelectorFromName('initialize'),
    calldata: CallData.compile({ signer: publicKey, guardian: '0' }),
  })
}
