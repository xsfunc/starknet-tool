import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { createRoutesView } from 'atomic-router-react'
import { appStarted } from './model'
import { AccountsPage, HomePage, SettingsPage } from '@/pages'
import { routes } from '@/shared/config'

const RoutesView = createRoutesView({
  routes: [
    { route: routes.home, view: HomePage },
    { route: routes.settings, view: SettingsPage },
    { route: routes.accounts, view: AccountsPage },
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
