import { Button } from '@mui/joy'
import { useUnit } from 'effector-react'
import { getAccountBalance } from '.'
import type { ERC20 } from '@/shared/config'
import { erc20Tokens } from '@/shared/config'

export function GetAccountBalanceButton({ accountAddress, token }: { accountAddress: string; token: string }) {
  const getBalance = useUnit(getAccountBalance)
  return (
    <Button
      onClick={() => getBalance({
        accountAddress,
        ...erc20Tokens[token] as ERC20,
      })}
    >
      Get balance
    </Button>
  )
}
