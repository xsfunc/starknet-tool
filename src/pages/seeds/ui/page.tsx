import { Stack, Typography } from '@mui/joy'
import { SeedsTable } from './seeds-table'
import { AddSeedButton } from '@/features/add-seed'

export function SeedsPage() {
  return <>
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='start'
      sx={{ mb: 2 }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        Seeds
      </Typography>

      <Stack direction='row' gap={1}>
        <AddSeedButton/>
      </Stack>
    </Stack>

    <SeedsTable />
  </>
}
