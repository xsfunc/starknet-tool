import { Button } from '@mui/joy'
import { topUpAccount } from '.'

interface Props {
  address: string
}

export function TopUpBalance({ address }: Props) {
  return <Button onClick={() => topUpAccount(address)}>
    top
  </Button>
}
