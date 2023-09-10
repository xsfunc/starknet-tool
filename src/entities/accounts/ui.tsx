import { Checkbox, IconButton, Sheet, Stack } from '@mui/joy'
import Table from '@mui/joy/Table'
import { useList } from 'effector-react'
import { shortAddress } from './methods'
import { accountsModel } from '.'
import { CopyButton, OpenLink } from '@/shared/ui'
import MenuIcon from '~icons/solar/menu-dots-outline'
import { TopUpBalance } from '@/features/top-up-accounts'

export function AccountsTable() {
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

          <OpenLink href={`https://voyager.online/contract/${contractAddress}`} />
          {shortAddress(contractAddress)}
          <CopyButton text={contractAddress} />
        </Stack>
      </td>
      <td>created</td>
      <td>?</td>
      <td>
        <IconButton variant='soft' size='sm'>
          <MenuIcon />
        </IconButton>
        <TopUpBalance address={contractAddress} />
      </td>
    </tr>
  ))

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
