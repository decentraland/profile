import { Rarity } from '@dcl/schemas'
import HoodyCapImage from '../../../assets/images/rewards/hoody-cap.png'
import SneakersMythic from '../../../assets/images/rewards/sneakers-mythic.png'
import Sneakers from '../../../assets/images/rewards/sneakers.png'
import { ReferralTier } from '../../../modules/referrals/types'

const TIERS = [
  { invitesAccepted: 5, rarity: Rarity.EPIC, completed: false, image: Sneakers, description: 'Bottom Wearable' },
  { invitesAccepted: 10, rarity: Rarity.EPIC, completed: false, image: Sneakers, description: 'Top Wearable + Bronze Badge' },
  { invitesAccepted: 20, rarity: Rarity.LEGENDARY, completed: false, image: Sneakers, description: 'Shoes Wearable' },
  { invitesAccepted: 25, rarity: Rarity.LEGENDARY, completed: false, image: Sneakers, description: 'Handwear + Silver Badge' },
  { invitesAccepted: 30, rarity: Rarity.EXOTIC, completed: false, image: Sneakers, description: 'Hat/Headpiece Wearable' },
  { invitesAccepted: 50, rarity: Rarity.EXOTIC, completed: false, image: Sneakers, description: 'Emote + Gold Badge' },
  { invitesAccepted: 60, rarity: Rarity.MYTHIC, completed: false, image: Sneakers, description: 'Jacket Wearable' },
  {
    invitesAccepted: 75,
    rarity: Rarity.MYTHIC,
    completed: false,
    image: HoodyCapImage,
    claim: false,
    description: 'Emote + Platinum Badge'
  },
  {
    invitesAccepted: 100,
    rarity: 'SWAG',
    completed: false,
    image: SneakersMythic,
    description: 'In world Wearable + IRL Swag Pack + Diamond Badge'
  }
] as ReferralTier[]

export { TIERS }
