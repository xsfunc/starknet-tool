import { Checkbox, Sheet, Stack, Table, Typography } from '@mui/joy'
import { useList, useUnit } from 'effector-react'
import { settings } from '../settings'
import { shortAddress } from './methods'
import type { AccountAction } from './types'
import { accountsManager } from '.'
import { CopyButton, OpenLink } from '@/shared/ui'
import PKSourceIcon from '~icons/solar/key-bold'
import SeedSourceIcon from '~icons/solar/folder-bold'

interface Props {
  Action: React.FC<AccountAction>
}

export function AccountsTable({ Action }: Props) {
  const { hasAccounts } = useUnit(accountsManager)
  const { contractLink } = useUnit(settings.explorer)
  const list = useList(accountsManager.rawAccounts, ({ contractAddress, ethBalance, source }) => (
    <tr>
      <td>
        <Checkbox size='sm' />
      </td>
      <td>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
        >
          <OpenLink href={contractLink(contractAddress)} />
          <AccountSourceIcon source={source} />
          {shortAddress(contractAddress)}
          <CopyButton text={contractAddress} />
        </Stack>
      </td>
      <td>created</td>
      <td>{ethBalance}ETH</td>
      <td>?</td>
      <td>
        <Action address={contractAddress} />
      </td>
    </tr>
  ))

  if (!hasAccounts) {
    return (
      <Sheet sx={{ borderRadius: 'md', p: 2 }}>
        <Typography>Have no accounts.</Typography>
      </Sheet>
    )
  }

  return (
    <Sheet
      variant='outlined'
      sx={{
        p: 1,
        borderRadius: 'md',
      }}
    >
      <Table
        aria-label="accounts table"
      >
        <thead>
          <tr>
            <th style={{ width: 50 }}>
              <Checkbox size='sm' />
            </th>
            <th style={{ width: '40%' }}>Contract Address</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Deployed at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    </Sheet>
  )
}

export function AccountSourceIcon({ source }: { source: 'pk' | 'seed' }) {
  return (
    source === 'seed'
      ? <SeedSourceIcon />
      : <PKSourceIcon />
  )
}
