import { Box, Divider, Typography } from '@mui/joy'
import { OkxSection } from './okx-section'
import { StarknetProviderSection } from './provider-section'
import { ExplorerSection, PasswordSection } from '@/entities/settings'
import { ImportExportDataSection } from '@/features/import-export-data'

export function SettingsPage() {
  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 2 }}>
        Settings
      </Typography>

      <StarknetProviderSection />
      <Divider sx={{ my: 3 }} />
      <ExplorerSection />
      <Divider sx={{ my: 3 }} />
      <OkxSection />
      <Divider sx={{ my: 3 }} />
      <PasswordSection />
      <Divider sx={{ my: 3 }} />
      <ImportExportDataSection />
    </Box>
  )
}
