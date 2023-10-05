import { sample } from 'effector'
import type { Event } from 'effector'
import type { Seed } from './types'
import { seedsManager } from '.'
import { starknetManager } from '@/shared/lib'

interface WithSeedUUID {
  uuid: string
  [key: string]: any
}

export function withSeed<T extends WithSeedUUID>(clock: Event<T>) {
  return sample({
    clock,
    source: {
      seeds: seedsManager.seeds,
      provider: starknetManager.provider,
    },
    filter({ seeds }, { uuid }) {
      return seeds.find(seed => seed.uuid === uuid) !== undefined
    },
    fn({ seeds, provider }, params) {
      const seed = seeds.find(seed => seed.uuid === params.uuid) as Seed
      return { provider, ...params, seed }
    },
  })
}
