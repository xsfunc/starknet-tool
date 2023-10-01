import { createEffect, createEvent, sample } from 'effector'
import { Contract, uint256 } from 'starknet'
import { format } from 'dnum'
import type { Account, Provider } from 'starknet'
import erc20Json from './erc20.json'
import type { ERC20 } from '@/shared/config'
import { accountsManager, withAccount } from '@/entities/accounts'

type GetBalancePayload = ERC20 & { accountAddress: string }

const getAccountBalanceCalled = createEvent<GetBalancePayload>()
const getAccountBalanceFx = createEffect(getAccountBalance)

sample({
  clock: withAccount<GetBalancePayload>(getAccountBalanceCalled),
  target: getAccountBalanceFx,
})

sample({
  clock: getAccountBalanceFx.done,
  fn: ({ params, result }) => ({
    contractAddress: params.account.address,
    payload: { [`${params.symbol}Balance`]: result },
  }),
  target: accountsManager.updateAccount,
})

export { getAccountBalanceCalled as getAccountBalance }

type GetAccountBalanceProps = {
  provider: Provider
  account: Account
} & ERC20

async function getAccountBalance({
  provider,
  account,
  contractAddress,
  decimals = 18,
}: GetAccountBalanceProps) {
  const erc20Contract = new Contract(erc20Json.abi, contractAddress, provider)
  const balanceResponse = await erc20Contract.balanceOf(account.address)
  const bigIntBalance = uint256.uint256ToBN(balanceResponse.balance)
  return format([bigIntBalance, decimals], { digits: 5, decimalsRounding: 'ROUND_DOWN' })
}
