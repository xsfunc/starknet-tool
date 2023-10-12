import { Stack, Typography } from '@mui/joy'
import { useUnit } from 'effector-react'
import { AccountsTable, accountsManager } from '@/entities/accounts'
import { AccountAction } from '@/widgets/account-action'
import { ExportButton } from '@/features/export-accounts'
import { AddAccountButton } from '@/widgets/add-account/ui'

export function AccountsPage() {
  const { accounts } = useUnit(accountsManager)
  const accountsCount = accounts.length > 0 ? `(${accounts.length})` : ''
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        sx={{ mb: 2 }}
      >
        <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
          Accounts
          {' '}
          {accountsCount}
        </Typography>

        <Stack direction="row" gap={1}>
          <ExportButton />
          <AddAccountButton />
        </Stack>
      </Stack>

      <AccountsTable Action={AccountAction} />
    </>
  )
}
