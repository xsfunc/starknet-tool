import { Button } from '@mui/joy'
import { useUnit } from 'effector-react'
import { getAccountBalance } from '.'
import { erc20Tokens } from '@/shared/config'

export function GetAccountBalanceButton({ accountAddress, token }: { accountAddress: string; token: string }) {
  const getBalance = useUnit(getAccountBalance)
  return (
    <Button
      onClick={() => getBalance({
        accountAddress,
        ...erc20Tokens[token],
      })}
    >
      Get balance
    </Button>
  )
}
