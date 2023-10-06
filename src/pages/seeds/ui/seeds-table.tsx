import { useList, useUnit } from 'effector-react'
import { Sheet, Stack, Table, Typography } from '@mui/joy'
import { seedsManager, shortMnemonic } from '@/entities/seeds'
import { CopyButton } from '@/shared/ui'
import { AddAccountButton } from '@/features/add-accounts-by-seed'
import { RemoveSeedButton } from '@/features/remove-seed'

export function SeedsTable() {
  const { hasSeeds } = useUnit(seedsManager)

  const list = useList(seedsManager.seeds, ({ uuid, mnemonic, HDPathOffset }) => (
    <tr>
      <td>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
        >
          <CopyButton text={mnemonic} />
          {shortMnemonic(mnemonic)}
        </Stack>
      </td>
      <td>{HDPathOffset}</td>
      <td>
        <Stack direction='row' gap={1}>
          <AddAccountButton uuid={uuid} />
          <RemoveSeedButton uuid={uuid} />
        </Stack>
      </td>
    </tr>
  ))

  if (!hasSeeds) {
    return (
      <Sheet sx={{ borderRadius: 'md', p: 2 }}>
        <Typography>Have no seeds.</Typography>
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
            <th>Mnemonic</th>
            <th>Accounts</th>
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
