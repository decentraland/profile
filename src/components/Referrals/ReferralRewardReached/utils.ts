import { Rarity } from '@dcl/schemas'
import DefaultBg from '../../../assets/images/rewards/reach-default-background.webp'
import ExoticBg from '../../../assets/images/rewards/reach-exotic-background.webp'
import LegendaryBg from '../../../assets/images/rewards/reach-legendary-background.webp'
import MythicBg from '../../../assets/images/rewards/reach-mythic-background.webp'
import SwagBg from '../../../assets/images/rewards/reach-swag-background.webp'

const getBackgroundImage = (rarity: Rarity | 'SWAG') => {
  switch (rarity) {
    case Rarity.EXOTIC:
      return ExoticBg
    case Rarity.MYTHIC:
      return MythicBg
    case Rarity.LEGENDARY:
      return LegendaryBg
    case 'SWAG':
      return SwagBg
    default:
      return DefaultBg
  }
}

export { getBackgroundImage }
