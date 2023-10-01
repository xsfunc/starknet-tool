import { settings } from '@/entities/settings'
import { routes } from '@/shared/config'
import { chainAuthorized } from '@/shared/session'

export const authorizedHomeRoute = chainAuthorized({
  route: routes.home,
  redirectLoginRoute: routes.password,
  authRequired: settings.security.usePassword,
})
