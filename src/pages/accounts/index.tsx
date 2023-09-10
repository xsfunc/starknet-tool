import { Button, Stack, Typography } from '@mui/joy'
import { useUnit } from 'effector-react'

import { AccountsTable, accountsModel } from '@/entities/accounts'
import { AddAccountButton } from '@/features/add-accounts'

export function AccountsPage() {
  const { downloadAccounts } = useUnit(accountsModel)
  return <>
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='start'
      sx={{ mb: 2 }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        Accounts
      </Typography>

      <Stack direction='row' gap={1}>
        <Button
          size='sm'
          variant='outlined'
          color='neutral'
          onClick={() => downloadAccounts()}>
          Download
        </Button>
        <AddAccountButton />
      </Stack>
    </Stack>
    <AccountsTable />
  </>
}
