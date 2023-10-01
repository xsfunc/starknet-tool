import { settings } from '@/entities/settings'
import { routes } from '@/shared/config'
import { chainAuthorized } from '@/shared/session'

export const authorizedSettingsRoute = chainAuthorized({
  route: routes.settings,
  redirectLoginRoute: routes.password,
  authRequired: settings.security.usePassword,
})
