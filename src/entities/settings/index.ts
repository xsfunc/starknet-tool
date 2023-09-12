import { $credentials, getBalances } from './okx'
import { $provider } from './starknet-provider'

export * from './password'
export * from './starknet-provider'
export * from './okx'

export const settings = {
  starknetProvider: $provider,
  okx: {
    isCredentialsValid: $credentials.map(({ isValid }) => isValid),
    isValidating: getBalances.$status.map(status => status === 'pending'),
    credentials: $credentials,
  },
}
