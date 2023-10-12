import { Toaster } from 'react-hot-toast'

export function RightBottomToaster() {
  return (
    <Toaster
      reverseOrder
      position="bottom-right"
      toastOptions={{
        duration: 2000,
      }}
    />
  )
}
