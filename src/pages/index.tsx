import { createRoutesView } from 'atomic-router-react'
import { AccountsPage, authorizedAccountsRoute } from './accounts'
import { SettingsPage } from './settings'
import { authorizedSettingsRoute } from './settings/model'
import { HomePage, authorizedHomeRoute } from './home'
import { guestPasswordRoute } from './password'
import { BaseLayout } from '@/widgets/base-layout'
import { AuthWithPasswordForm } from '@/features/auth-with-password'

export const PagesView = createRoutesView({
  routes: [
    { route: authorizedHomeRoute, view: HomePage, layout: BaseLayout },
    { route: authorizedAccountsRoute, view: AccountsPage, layout: BaseLayout },
    { route: authorizedSettingsRoute, view: SettingsPage, layout: BaseLayout },
    { route: guestPasswordRoute, view: AuthWithPasswordForm, layout: BaseLayout },
  ],

  otherwise: () => <div>Page not found!</div>,
})
