import { invoke } from '@withease/factories'
import { createModal } from '@/shared/lib'

export const addAccountModal = invoke(createModal<void>)
