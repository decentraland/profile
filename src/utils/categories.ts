import { ItemCategory } from '../modules/items/types'
import { NFTCategory } from '../modules/nfts/types'

export enum MainCategory {
  WEARABLE = 'wearable',
  EMOTE = 'emote',
  LAND = 'land',
  ENS = 'ens'
}

export enum WearableCategory {
  HEAD = 'wearable_head',
  UPPER_BODY = 'wearable_upper_body',
  LOWER_BODY = 'wearable_lower_body',
  FEET = 'wearable_feet',
  HANDS = 'wearable_hands',
  ACCESSORIES = 'wearable_accessories',
  SKIN = 'wearable_skin'
}

export enum AccessoryCategory {
  EARRING = 'wearable_earring',
  EYEWEAR = 'wearable_eyewear',
  HAT = 'wearable_hat',
  HELMET = 'wearable_helmet',
  MASK = 'wearable_mask',
  TIARA = 'wearable_tiara',
  TOP_HEAD = 'wearable_top_head'
}

export enum HeadCategory {
  EYEBROWS = 'wearable_eyebrows',
  EYES = 'wearable_eyes',
  FACIAL_HAIR = 'wearable_facial_hair',
  HAIR = 'wearable_hair',
  MOUTH = 'wearable_mouth'
}

export enum EmoteCategory {
  DANCE = 'emote_dance',
  STUNT = 'emote_stunt',
  GREETINGS = 'emote_greetings',
  FUN = 'emote_fun',
  POSES = 'emote_poses',
  REACTIONS = 'emote_reactions',
  HORROR = 'emote_horror',
  MISCELLANEOUS = 'emote_miscellaneous'
}

export enum LandCategory {
  PARCEL = 'land_parcel',
  ESTATE = 'land_estate'
}

export function getAllCategories(isItem: false): NFTCategory[]
export function getAllCategories(isItem: true): ItemCategory[]
export function getAllCategories(isItem: boolean): NFTCategory[] | ItemCategory[] {
  const categories = []
  categories.push(MainCategory.WEARABLE)
  categories.push(MainCategory.EMOTE)
  categories.push(...Object.values(WearableCategory))
  categories.push(...Object.values(AccessoryCategory))
  categories.push(...Object.values(HeadCategory))
  categories.push(...Object.values(EmoteCategory))

  if (!isItem) {
    categories.push(MainCategory.ENS)
    categories.push(MainCategory.LAND)
    categories.push(...Object.values(LandCategory))
  }
  return categories
}

export function getWearableCategories(): NFTCategory[] {
  return [MainCategory.WEARABLE, ...Object.values(WearableCategory), ...Object.values(HeadCategory), ...Object.values(AccessoryCategory)]
}

export function getEmoteCategories(): NFTCategory[] {
  return [MainCategory.EMOTE, ...Object.values(EmoteCategory)]
}

export function getLandCategories(): NFTCategory[] {
  return [MainCategory.LAND, ...Object.values(LandCategory)]
}
