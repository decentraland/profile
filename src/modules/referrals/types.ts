import { Rarity } from '@dcl/schemas'

type ReferralTier = {
  invitesAccepted: number
  image: string
  rarity: Rarity | 'SWAG'
  claim?: boolean
  description: string
}

export type { ReferralTier }

export type ReferralProgressResponse = {
  invitedUsersAccepted: number
  invitedUsersAcceptedViewed: number
  rewardImages: { tier: number; url: string }[]
}
