import { createEvent, createStore, sample } from 'effector'
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

export const createModalDialog = createFactory(<T>() => {
  const submitCalled = createEvent()
  const closeCalled = createEvent()
  const openCalled = createEvent<T>()
  const submitted = createEvent<T>()

  const $store = createStore<T | null>(null)
    .reset(closeCalled)

  const $open = createStore(false)
    .on(closeCalled, () => false)
    .on(openCalled, () => true)

  sample({
    clock: openCalled,
    target: $store,
  })
  sample({
    clock: submitCalled,
    source: $store,
    filter: (store): store is T => Boolean(store),
    target: [submitted, closeCalled],
  })

  return {
    store: $store,
    isOpen: $open,
    close: closeCalled,
    open: openCalled,
    submit: submitCalled,
    submitted,
  }
})
