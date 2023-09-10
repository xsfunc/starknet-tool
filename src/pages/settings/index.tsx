import { Box, Divider, Typography } from '@mui/joy'
import { OkxSection } from './okx-section'
import { StarknetProviderSection } from './provider-section'

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
      <Divider sx={{ my: 2 }} />
      <OkxSection />
    </Box>
  )
}
