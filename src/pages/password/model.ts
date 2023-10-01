import { settings } from '@/entities/settings'
import { routes } from '@/shared/config'
import { chainGuest } from '@/shared/session'

export const guestPasswordRoute = chainGuest({
  route: routes.password,
  redirectRoute: routes.home,
  authRequired: settings.security.usePassword,
})
