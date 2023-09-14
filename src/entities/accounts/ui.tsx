import { Checkbox, Sheet, Stack, Typography } from '@mui/joy'
import Table from '@mui/joy/Table'
import { useList, useUnit } from 'effector-react'
import React from 'react'
import { settings } from '../settings'
import { shortAddress } from './methods'
import type { AccountAction } from './types'
import { accountsModel } from '.'
import { CopyButton, OpenLink } from '@/shared/ui'

interface Props {
  Action: React.FC<AccountAction>
}

export function AccountsTable({ Action }: Props) {
  const { hasAccounts } = useUnit(accountsModel)
  const { contractLink } = useUnit(settings.explorer)
  const list = useList(accountsModel.rawAccounts, ({ contractAddress }) => (
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
          {shortAddress(contractAddress)}
          <CopyButton text={contractAddress} />
        </Stack>
      </td>
      <td>created</td>
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
