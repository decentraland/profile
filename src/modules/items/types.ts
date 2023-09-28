import { ItemFilters } from '@dcl/schemas'

export type CreationsFetchOptions = Omit<Options, 'creator'> & Required<Pick<Options, 'creator'>>

export type Options = Pick<ItemFilters, 'first' | 'skip' | 'creator' | 'ids' | 'network' | 'urns' | 'rarities'> & {
  category?: Categories
  status?: ItemSaleStatus
}

export enum ItemSaleStatus {
  ON_SALE = 'on_sale',
  ONLY_MINTING = 'only_minting',
  ONLY_LISTING = 'only_listing',
  NOT_FOR_SALE = 'not_for_sale'
}

export enum Categories {
  WEARABLES = 'wearables',
  EMOTES = 'emotes',
  WEARABLES_HEAD = 'wearables_head',
  WEARABLES_UPPER_BODY = 'wearables_upper_body',
  WEARABLES_LOWER_BODY = 'wearables_lower_body',
  WEARABLES_FEET = 'wearables_feet',
  WEARABLES_HANDS = 'wearables_hands',
  WEARABLES_ACCESSORIES = 'wearables_accessories',
  WEARABLES_SKIN = 'wearables_skin',
  WEARABLES_EARRING = 'wearables_earring',
  WEARABLES_EYEWEAR = 'wearables_eyewear',
  WEARABLES_HAT = 'wearables_hat',
  WEARABLES_HELMET = 'wearables_helmet',
  WEARABLES_MASK = 'wearables_mask',
  WEARABLES_TIARA = 'wearables_tiara',
  WEARABLES_TOP_HEAD = 'wearables_top_head',
  WEARABLES_EYEBROWS = 'wearables_eyebrows',
  WEARABLES_EYES = 'wearables_eyes',
  WEARABLES_FACIAL_HAIR = 'wearables_facial_hair',
  WEARABLES_HAIR = 'wearables_hair',
  WEARABLES_MOUTH = 'wearables_mouth',
  EMOTES_DANCE = 'emotes_dance',
  EMOTES_STUNT = 'emotes_stunt',
  EMOTES_GREETINGS = 'emotes_greetings',
  EMOTES_FUN = 'emotes_fun',
  EMOTES_POSES = 'emotes_poses',
  EMOTES_REACTIONS = 'emotes_reactions',
  EMOTES_HORROR = 'emotes_horror',
  EMOTES_MISCELLANEOUS = 'emotes_miscellaneous'
}

export enum MainCategories {
  WEARABLES = 'wearables',
  EMOTES = 'emotes'
}

export enum WearableCategory {
  WEARABLES_HEAD = 'wearables_head',
  WEARABLES_UPPER_BODY = 'wearables_upper_body',
  WEARABLES_LOWER_BODY = 'wearables_lower_body',
  WEARABLES_FEET = 'wearables_feet',
  WEARABLES_HANDS = 'wearables_hands',
  WEARABLES_ACCESSORIES = 'wearables_accessories',
  WEARABLES_SKIN = 'wearables_skin'
}

export enum AccessoryCategory {
  WEARABLES_EARRING = 'wearables_earring',
  WEARABLES_EYEWEAR = 'wearables_eyewear',
  WEARABLES_HAT = 'wearables_hat',
  WEARABLES_HELMET = 'wearables_helmet',
  WEARABLES_MASK = 'wearables_mask',
  WEARABLES_TIARA = 'wearables_tiara',
  WEARABLES_TOP_HEAD = 'wearables_top_head'
}

export enum HeadCategory {
  WEARABLES_EYEBROWS = 'wearables_eyebrows',
  WEARABLES_EYES = 'wearables_eyes',
  WEARABLES_FACIAL_HAIR = 'wearables_facial_hair',
  WEARABLES_HAIR = 'wearables_hair',
  WEARABLES_MOUTH = 'wearables_mouth'
}

export enum EmotesCategory {
  EMOTES_DANCE = 'emotes_dance',
  EMOTES_STUNT = 'emotes_stunt',
  EMOTES_GREETINGS = 'emotes_greetings',
  EMOTES_FUN = 'emotes_fun',
  EMOTES_POSES = 'emotes_poses',
  EMOTES_REACTIONS = 'emotes_reactions',
  EMOTES_HORROR = 'emotes_horror',
  EMOTES_MISCELLANEOUS = 'emotes_miscellaneous'
}
