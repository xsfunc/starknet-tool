import type { Event, Store } from 'effector'
import { createEvent, createStore } from 'effector'
import { createFactory } from '@withease/factories'

interface ModalState extends Record<string, Store<any> | Event<any>> {
  isOpen: Store<boolean>
  close: Event<void>
  open: Event<void>
}

type UnitObject = Record<string, Store<any> | Event<any>>
// <T extends UnitObject>(units: T): ModalState & T

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
