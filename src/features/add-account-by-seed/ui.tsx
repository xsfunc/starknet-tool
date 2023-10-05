import { Button } from '@mui/joy'
import { useUnit } from 'effector-react'
import { accountsCreationPending, addAccountsBySeed } from '.'

interface Props {
  uuid: string
}

export function AddAccountButton({ uuid }: Props) {
  const addAccount = useUnit(addAccountsBySeed)
  const loading = useUnit(accountsCreationPending)
  return (
    <Button
      loading={loading}
      onClick={() => addAccount({ uuid, count: 1 })}
      size='sm'
    >
      Add account
    </Button>
  )
}
