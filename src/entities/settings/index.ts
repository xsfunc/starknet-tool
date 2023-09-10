import { $credentials } from './okx'
import { $provider } from './starknet-provider'

export * from './password'
export * from './starknet-provider'
export * from './okx'

export const settings = {
  starknetProvider: $provider,
  okx: {
    credentials: $credentials,
  },
}
