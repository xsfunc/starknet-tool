import { persist } from 'effector-storage/local'

// persist store `$counter` in `localStorage` with key 'counter'
persist({ store: $counter, key: 'counter' })

// if your storage has a name, you can omit `key` field
persist({ store: $counter })
