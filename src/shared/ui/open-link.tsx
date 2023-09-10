import { Link } from '@mui/joy'
import LinkIcon from '~icons/solar/link-minimalistic-2-bold-duotone'

export function OpenLink({ href }: { href: string }) {
  return (
    <Link
      target='_blank'
      href={href}
    >
      <LinkIcon />
    </Link>
  )
}
