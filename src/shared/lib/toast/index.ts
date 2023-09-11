import { createEffect, createEvent, sample } from 'effector'
import toast from 'react-hot-toast'

interface Props {
  message: string
  type: 'success' | 'error' | 'custom'
  options: {
    duration: number
    position: 'bottom-right'
  }
}

const notified = createEvent<Props>()
const notifyFx = createEffect(({
  message,
  type,
  options,
}: Props) =>
  type
    ? toast[type](message, options)
    : toast(message, options),
)

sample({
  clock: notified,
  target: notifyFx,
})

export { notified as notify }
export * from './ui'
