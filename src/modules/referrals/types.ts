import { Rarity } from '@dcl/schemas'

type ReferralTier = {
  tier: number
  completed: boolean
  image: string
  rarity: Rarity | 'SWAG'
  claim?: boolean
}

export type { ReferralTier }
