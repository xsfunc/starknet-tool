import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { HomePage } from './home'
import { appStarted } from './init'

export function Pages() {
  const onAppStarted = useUnit(appStarted)

  useEffect(() => {
    onAppStarted()
  }, [])

  return <HomePage />
}
