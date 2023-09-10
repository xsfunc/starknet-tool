import { IconButton } from '@mui/joy'
import CopyIcon from '~icons/solar/copy-line-duotone'

export function CopyButton({ text }: { text: string }) {
  const copy = () =>
    navigator.clipboard.writeText(text)

  return (
    <IconButton
      onClick={copy}
      variant="plain"
      size='sm'
    >
      <CopyIcon />
    </IconButton>
  )
}
