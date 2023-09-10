import { Stack, Typography } from '@mui/joy'

import { AccountsTable } from '@/entities/accounts'
import { AddAccountButton } from '@/features/add-accounts'
import { AccountAction } from '@/widgets/account-action'
import { ExportButton } from '@/features/export-accounts'

export function AccountsPage() {
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
        <ExportButton />
        <AddAccountButton />
      </Stack>
    </Stack>

    <AccountsTable Action={AccountAction} />
  </>
}
