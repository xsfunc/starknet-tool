import { createEffect, createEvent, sample } from 'effector'
import toast from 'react-hot-toast'

interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'custom'
  options?: {
    duration?: number
    position?: 'bottom-right'
  }
}

const notifyCalled = createEvent<NotificationProps>()
const notifyFx = createEffect(({
  message,
  type,
  options,
}: NotificationProps) => type
  ? toast[type](message, options)
  : toast(message, options))

sample({
  clock: notifyCalled,
  target: notifyFx,
})

export { notifyCalled as notify }
export * from './ui'
