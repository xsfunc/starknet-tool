import { createEvent, createStore } from 'effector'
import { createFactory } from '@withease/factories'

export const createModal = createFactory(<T>() => {
  const closeCalled = createEvent()
  const openCalled = createEvent<T>()

  const $open = createStore(false)
    .on(closeCalled, () => false)
    .on(openCalled, () => true)

  return {
    isOpen: $open,
    close: closeCalled,
    open: openCalled,
    opened: openCalled,
  }
})
