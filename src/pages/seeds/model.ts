import { settings } from '@/entities/settings'
import { routes } from '@/shared/config'
import { chainAuthorized } from '@/shared/session'

export const authorizedSeedsRoute = chainAuthorized({
  route: routes.seeds,
  redirectLoginRoute: routes.password,
  authRequired: settings.security.usePassword,
})
