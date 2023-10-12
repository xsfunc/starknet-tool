import { CallData, cairo, ec, hash, stark } from 'starknet'
import type { Provider } from 'starknet'
import type { AccountData } from '..'

const contractImplementations = {
  '0.3.0': {
    class: '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003',
    proxy: null,
  },
  '0.2.3.1': {
    class: '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2',
    proxy: '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918',
  },
} as const

interface CreateAccountProps {
  find?: boolean
  privateKey?: string
  provider?: Provider
}

export async function createAccountWithPK({
  find,
  privateKey,
  provider,
}: CreateAccountProps): Promise<AccountData> {
  const pk = privateKey || stark.randomAddress()
  const publicKey = ec.starkCurve.getStarkKey(pk)
  if (find && provider)
    return findContractAddress(pk, publicKey, provider)
  return contractAddress030(pk, publicKey)
}

async function findContractAddress(privateKey: string, publicKey: string, provider: Provider): Promise<AccountData> {
  const raw030Account = contractAddress030(privateKey, publicKey)
  const raw0231Account = contractAddress0231(privateKey, publicKey)

  const result030 = await provider
    .getClassAt(raw030Account.contractAddress)
    .catch(() => null)
  if (result030)
    return { ...raw030Account, deployed: true }

  const result0231 = await provider
    .getClassAt(raw0231Account.contractAddress)
    .catch(() => null)
  if (result0231) {
    const cairoVersion = cairo.isCairo1Abi(result0231.abi) ? 1 : 0
    return { ...raw0231Account, cairoVersion, deployed: true }
  }
  // if nothing found return address of last version contract
  return raw030Account
}

function contractAddress030(privateKey: string, publicKey: string) {
  const callData = CallData.compile([publicKey, 0])
  const contractAddress = hash.calculateContractAddressFromHash(
    publicKey,
    contractImplementations['0.3.0'].class,
    callData,
    0,
  )
  return {
    publicKey,
    contractAddress,
    privateKey,
    contractType: 'argent-x',
    cairoVersion: 1,
  } as AccountData
}

function contractAddress0231(privateKey: string, publicKey: string) {
  const hashes = contractImplementations['0.2.3.1']
  const proxyConstructorCallData = constructorCallData(hashes.class, publicKey)
  const contractAddress = hash.calculateContractAddressFromHash(
    publicKey,
    hashes.proxy,
    proxyConstructorCallData,
    0,
  )
  return {
    publicKey,
    contractAddress,
    privateKey,
    contractType: 'argent-x',
    cairoVersion: 0,
  } as AccountData
}

function constructorCallData(classHash: string, publicKey: string) {
  return CallData.compile({
    implementation: classHash,
    selector: hash.getSelectorFromName('initialize'),
    calldata: CallData.compile({ signer: publicKey, guardian: '0' }),
  })
}
