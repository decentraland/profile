import { ReferralTier } from '../../../modules/referrals/types'

export interface ReferralRewardReachedProps {
  open: boolean
  onClick: () => void
  reward: ReferralTier
}
