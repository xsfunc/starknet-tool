import { Button, FormControl, FormLabel, Input, Option, Select, Typography } from '@mui/joy'
import { useForm } from 'effector-forms'
import { providerForm } from '@/entities/settings'

export function StarknetProviderSection() {
  const { fields, submit } = useForm(providerForm)
  return (
    <>
      <Typography level="title-lg" component="h2" sx={{ mb: 1 }}>
        Starknet Provider
      </Typography>
      <FormControl size="sm" sx={{ mb: 1 }}>
        <FormLabel>Provider Type</FormLabel>
        <Select
          value={fields.type.value}
          onChange={(_, value) => fields.type.onChange(value || 'sequencer')}
        >
          <Option value="sequencer">Sequencer gateway</Option>
          <Option value="rpc">RPC Node</Option>
        </Select>
      </FormControl>

      <FormControl size="sm" sx={{ mb: 1 }}>
        <FormLabel>Node URL or Sequencer</FormLabel>
        <Input
          value={fields.url.value}
          onChange={e => fields.url.onChange(e.target.value)}
        />
      </FormControl>

      <Button size="sm" onClick={() => submit()}>
        Save
      </Button>
    </>
  )
}
