import { ReferralTier } from '../../../modules/referrals/types'

export type ReferralRewardCardProps = ReferralTier & {
  completed: boolean
  onSetReferralEmail?: (email: string) => void
}
