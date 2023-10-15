import { createEffect, createEvent, sample } from 'effector'
import type { Provider } from 'starknet'
import { Account, CallData, ec, hash } from 'starknet'
import { notify, starknetManager } from '@/shared/lib'
import type { AccountData } from '@/entities/accounts'
import { accountsManager } from '@/entities/accounts'

const deployCalled = createEvent<string>()
const deployAccountFx = createEffect(deployAcc)

sample({
  clock: deployCalled,
  source: {
    provider: starknetManager.provider,
    accounts: accountsManager.rawAccounts,
  },
  fn: ({ provider, accounts }, address) => {
    const { privateKey } = accounts.find(acc => acc.contractAddress === address) as AccountData
    return { privateKey, provider }
  },
  target: deployAccountFx,
})

sample({
  clock: deployAccountFx.done,
  fn: () => ({ message: 'Deploy tx successfully sent.', type: 'success' } as const),
  target: notify,
})
sample({
  clock: deployAccountFx.fail,
  fn: () => ({ message: 'Error occurred.', type: 'error' } as const),
  target: notify,
})

export const deployAccount = deployCalled

async function deployAcc({ privateKey, provider }: { provider: Provider; privateKey: string }) {
  // new Argent X account v0.2.3
  const proxyClassHash = '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918'
  const accountClassHash = '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2'
  const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKey)

  // Calculate future address of the ArgentX account
  const callData = CallData.compile({
    implementation: accountClassHash,
    selector: hash.getSelectorFromName('initialize'),
    calldata: CallData.compile({ signer: starkKeyPubAX, guardian: '0' }),
  })

  const contractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    proxyClassHash,
    callData,
    0,
  )

  const account = new Account(provider, contractAddress, privateKey)
  const deployAccountPayload = {
    classHash: proxyClassHash,
    constructorCalldata: callData,
    addressSalt: starkKeyPubAX,
    contractAddress,
  }

  const { transaction_hash: txHash } = await account.deployAccount(deployAccountPayload)
  return txHash
}
