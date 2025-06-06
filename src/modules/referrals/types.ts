import { Rarity } from '@dcl/schemas'

type ReferralTier = {
  tier: number
  completed: boolean
  image: string
  rarity: Rarity | 'SWAG'
  description: string
  claim?: boolean
}

export type { ReferralTier }
