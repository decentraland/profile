import { Rarity } from '@dcl/schemas'
import Tier1 from '../../../assets/images/rewards/tier_1.webp'
import Tier2 from '../../../assets/images/rewards/tier_2.webp'
import Tier3 from '../../../assets/images/rewards/tier_3.webp'
import Tier4 from '../../../assets/images/rewards/tier_4.webp'
import Tier5 from '../../../assets/images/rewards/tier_5.webp'
import Tier6 from '../../../assets/images/rewards/tier_6.webp'
import Tier7 from '../../../assets/images/rewards/tier_7.webp'
import Tier8 from '../../../assets/images/rewards/tier_8.webp'
import Tier9 from '../../../assets/images/rewards/tier_9.webp'
import { ReferralTier } from '../../../modules/referrals/types'

const TIERS = [
  { invitesAccepted: 5, rarity: Rarity.EPIC, image: Tier1, description: 'RainbowWave Jeans + Community Recruiter Starter Badge' },
  { invitesAccepted: 10, rarity: Rarity.EPIC, image: Tier2, description: 'Good Vibes Letterman + Community Recruiter Bronze Badge' },
  { invitesAccepted: 20, rarity: Rarity.LEGENDARY, image: Tier3, description: 'Afterglow Kicks' },
  { invitesAccepted: 25, rarity: Rarity.LEGENDARY, image: Tier4, description: 'Signal Surge Gloves + Community Recruiter Silver Badge' },
  { invitesAccepted: 30, rarity: Rarity.EXOTIC, image: Tier5, description: 'Spunky MopTop' },
  { invitesAccepted: 50, rarity: Rarity.EXOTIC, image: Tier6, description: 'Postman Emote + Community Recruiter Gold Badge' },
  { invitesAccepted: 60, rarity: Rarity.MYTHIC, image: Tier7, description: 'Volty Vibes Shoulder Companion' },
  { invitesAccepted: 75, rarity: Rarity.MYTHIC, image: Tier8, description: 'Monocycle Emote + Community Recruiter Platinum Badge' },
  {
    invitesAccepted: 100,
    rarity: 'SWAG',
    image: Tier9,
    description: 'IRL Swag Pack + In-World Wearable + Community Recruiter Diamond Badge'
  }
] as ReferralTier[]

export const REFERRAL_JOURNEY_TEST_ID = {
  sectionContainer: 'referral-journey-section-container',
  titleContainer: 'referral-journey-title-container',
  title: 'referral-journey-title',
  subtitleContainer: 'referral-journey-subtitle-container',
  subtitle: 'referral-journey-subtitle',
  journeyContainer: 'referral-journey-container',
  journeyWrapper: 'referral-journey-wrapper',
  journeyStepper: 'referral-journey-stepper',
  journeyStepLine: 'referral-journey-step-line',
  journeyStep: 'referral-journey-step',
  gradientBorder: 'referral-journey-gradient-border',
  journeyStepIcon: 'referral-journey-step-icon',
  checkRoundedIcon: 'referral-journey-check-rounded-icon',
  referralRewardCard: 'referral-journey-reward-card',
  rewardModal: 'referral-journey-reward-modal'
} as const

export { TIERS }
