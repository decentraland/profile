import { CatalogFilters } from '@dcl/schemas'
import { AccessoryCategory, EmoteCategory, HeadCategory, MainCategory, WearableCategory } from '../../utils/categories'

export type CreationsFetchOptions = Omit<Options, 'creator'> & Required<Pick<Options, 'creator'>>

export type Options = Pick<
  CatalogFilters,
  'first' | 'skip' | 'creator' | 'ids' | 'network' | 'urns' | 'rarities' | 'isWearableSmart' | 'sortBy'
> & {
  category?: ItemCategory
  status?: ItemSaleStatus
}

export enum ItemSaleStatus {
  ON_SALE = 'on_sale',
  ONLY_MINTING = 'only_minting',
  ONLY_LISTING = 'only_listing',
  NOT_FOR_SALE = 'not_for_sale'
}

export type ItemCategory = MainCategory.EMOTE | MainCategory.WEARABLE | WearableCategory | AccessoryCategory | HeadCategory | EmoteCategory
