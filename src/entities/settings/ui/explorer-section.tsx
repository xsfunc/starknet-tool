import { FormControl, FormLabel, Option, Select, Typography } from '@mui/joy'
import { useUnit } from 'effector-react'
import { settings } from '@/entities/settings'

export function ExplorerSection() {
  const { active, update } = useUnit(settings.explorer)
  return (
    <>
      <Typography level="title-lg" component="h2" sx={{ mb: 1 }}>
        Active explorer
      </Typography>
      <FormControl size="sm" sx={{ mb: 1 }}>
        <FormLabel>Explorer</FormLabel>
        <Select
          value={active}
          onChange={(_, value) => update(value || 'starkscan')}
        >
          <Option value="starkscan">Starkscan</Option>
          <Option value="voyager">Voyager</Option>
          <Option value="oklink">Oklink</Option>
        </Select>
      </FormControl>
    </>
  )
}
