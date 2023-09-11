import { Toaster } from 'react-hot-toast'

export function LeftBottomToaster() {
  return <Toaster
    reverseOrder
    position='bottom-left'
    toastOptions={{
      custom: {
        duration: 2000,
      },
    }}
  />
}
