import { attach, combine, createEffect, createEvent, createStore, sample } from 'effector'
import type { Provider } from 'starknet'
import { Account, CallData, ec, hash, stark } from 'starknet'
import { debug, spread } from 'patronum'
import { starknetManager } from './model'
import type { AccountData } from './types'
import { constants } from '@/shared/config'

const createArgentXAccountFx = createEffect(createArgentXAccount)
const deployArgentXAccountFx = createEffect(deployArgentXAccount)

const updateClassHashCalled = createEvent<{ proxy: string; account: string }>()

const $proxyClassHash = createStore(constants.main.argentX.proxyClassHash)
const $accountClassHash = createStore(constants.main.argentX.accountClassHash)
const $accountConfig = combine({
  provider: starknetManager.provider,
  accountClassHash: $accountClassHash,
  proxyClassHash: $proxyClassHash,
})

const createAccountFx = attach({
  effect: createArgentXAccountFx,
  source: $accountConfig,
})
const deployAccountFx = attach({
  effect: deployArgentXAccountFx,
  source: $accountConfig,
  mapParams: (params: AccountData, source) => ({ ...source, ...params }),
})

sample({
  clock: createAccountFx.doneData,
  target: starknetManager.addAccount,
})

spread({
  source: updateClassHashCalled,
  targets: {
    proxy: $proxyClassHash,
    account: $accountClassHash,
  },
})

export const argentXManager = {
  createAccount: createAccountFx,
  deployAccount: deployAccountFx,
  updateClassHash: updateClassHashCalled,
}

debug(argentXManager)

function createArgentXAccount({
  proxyClassHash,
  accountClassHash,
}: {
  proxyClassHash: string
  accountClassHash: string
}): AccountData {
  const privateKey = stark.randomAddress()
  const publicKey = ec.starkCurve.getStarkKey(privateKey)
  const proxyConstructorCallData = constructorCallData(accountClassHash, publicKey)
  const contractAddress = hash.calculateContractAddressFromHash(
    publicKey,
    proxyClassHash,
    proxyConstructorCallData,
    0,
  )
  return {
    privateKey,
    publicKey,
    contractAddress,
  }
}

async function deployArgentXAccount({
  provider,
  privateKey,
  publicKey,
  contractAddress,
  accountClassHash,
  proxyClassHash,
}: {
  provider: Provider
  accountClassHash: string
  proxyClassHash: string
  privateKey: string
  publicKey: string
  contractAddress: string
}) {
  const account = new Account(provider, contractAddress, privateKey)
  const deployAccountPayload = {
    classHash: proxyClassHash,
    constructorCalldata: constructorCallData(accountClassHash, publicKey),
    addressSalt: publicKey,
    contractAddress,
  }

  const { transaction_hash: txHash } = await account.deployAccount(deployAccountPayload)
  return { txHash, contractAddress }
}

function constructorCallData(classHash: string, publicKey: string) {
  return CallData.compile({
    implementation: classHash,
    selector: hash.getSelectorFromName('initialize'),
    calldata: CallData.compile({ signer: publicKey, guardian: '0' }),
  })
}
