import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { createRoutesView } from 'atomic-router-react'
import { appStarted } from './model'
import { AccountsPage, HomePage, SettingsPage } from '@/pages'
import { routes } from '@/shared/config'
import { BaseLayout } from '@/widgets/base-layout'

const RoutesView = createRoutesView({
  routes: [
    { route: routes.home, view: HomePage, layout: BaseLayout },
    { route: routes.settings, view: SettingsPage, layout: BaseLayout },
    { route: routes.accounts, view: AccountsPage, layout: BaseLayout },
  ],
  otherwise() {
    return <div>Page not found!</div>
  },
})

export function RouterView() {
  const onAppStarted = useUnit(appStarted)

  useEffect(() => {
    onAppStarted()
  }, [])

  return <RoutesView />
}
