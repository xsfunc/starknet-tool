import { createEffect, createEvent, sample } from 'effector'
import toast from 'react-hot-toast'

interface Props {
  message: string
  type: 'success' | 'error' | 'custom'
  options?: {
    duration?: number
    position?: 'bottom-right'
  }
}

const notifyCalled = createEvent<Props>()
const notifyFx = createEffect(({
  message,
  type,
  options,
}: Props) => type
  ? toast[type](message, options)
  : toast(message, options))

sample({
  clock: notifyCalled,
  target: notifyFx,
})

export { notifyCalled as notify }
export * from './ui'
