import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { CallData, Provider, constants, ec, hash, stark } from 'starknet'
import { createAccountWithPK } from './create-argent-account-pk'
import { createAccountsWithSeed } from './create-argent-account-seed'
import type { ProviderPayload } from './types'

const $provider = createStore(getProvider())
const changeProviderCalled = createEvent<ProviderPayload>()

const waitTxFx = createEffect(waitTx)

sample({
  clock: changeProviderCalled,
  fn: getProvider,
  target: $provider,
})

export const starknetManager = {
  provider: $provider,
  changeProvider: changeProviderCalled,

  waitForTx: attach({
    effect: waitTxFx,
    source: $provider,
    mapParams: (tx: string, provider) => ({ provider, tx }),
  }),
}

export const starknetUtils = {
  createAccount,
  createAccountWithPK,
  createAccountsWithSeed,
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

async function waitTx({ provider, tx }: { provider: Provider; tx: string }) {
  return provider.waitForTransaction(tx)
}
