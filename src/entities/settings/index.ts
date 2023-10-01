import { explorer } from './model/explorer'
import { $credentials, getBalances } from './model/okx'
import { $provider } from './model/starknet-provider'
import { passwordSettings } from '.'

export * from './model/password'
export * from './model/starknet-provider'
export * from './model/okx'

export * from './ui/explorer-section'
export * from './ui/password-section'
export * from './ui/erase-password-dialog'

export const settings = {
  explorer,
  security: passwordSettings,
  starknetProvider: $provider,
  okx: {
    isCredentialsValid: $credentials.map(({ isValid }) => isValid),
    isValidating: getBalances.$status.map(status => status === 'pending'),
    credentials: $credentials,
  },
}
