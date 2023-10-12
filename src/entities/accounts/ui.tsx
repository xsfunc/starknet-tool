import { Checkbox, Sheet, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy'
import { useList, useUnit } from 'effector-react'
import { settings } from '../settings'
import { shortAddress } from './methods'
import type { AccountAction } from './types'
import { accountsManager } from '.'
import { CopyButton, OpenLink } from '@/shared/ui'
import PKSourceIcon from '~icons/solar/key-bold'
import SeedSourceIcon from '~icons/solar/folder-bold'
import WarningIcon from '~icons/solar/shield-warning-bold'

interface Props {
  Action: React.FC<AccountAction>
}

export function AccountsTable({ Action }: Props) {
  const { hasAccounts } = useUnit(accountsManager)
  const { contractLink } = useUnit(settings.explorer)
  const list = useList(accountsManager.rawAccounts, ({ contractAddress, ethBalance, source, deployed, cairoVersion }) => (
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
          <Typography
            variant={deployed ? 'plain' : undefined}
            color='neutral'
          >
            {shortAddress(contractAddress)}
          </Typography>
          <CopyButton text={contractAddress} />
          <CairoVersion version={cairoVersion} />
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
    <Tooltip
      placement='right'
      title={source === 'seed' ? 'Created with seed' : 'Created from private key'}
    >
      <Stack>
        {
          source === 'seed'
            ? <SeedSourceIcon />
            : <PKSourceIcon />
        }
      </Stack>
    </Tooltip>
  )
}

export function CairoVersion({ version }: { version: number | undefined }) {
  const theme = useTheme()
  if (version === 1)
    return null

  return (
    <Tooltip
      placement='right'
      title={'Upgrade account needed'}
    >
      <Stack>
        <WarningIcon color={theme.colorSchemes.dark.palette.warning.plainColor} />
      </Stack>
    </Tooltip>
  )
}
