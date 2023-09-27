import { ItemFilters } from '@dcl/schemas'
import { AccessoryCategory, EmoteCategory, HeadCategory, MainCategory, WearableCategory } from '../../utils/categories'

export type CreationsFetchOptions = Omit<Options, 'creator'> & Required<Pick<Options, 'creator'>>

export type Options = Pick<ItemFilters, 'first' | 'skip' | 'creator' | 'ids' | 'network' | 'urns' | 'rarities'> & { category?: ItemCategory }

export type ItemCategory = MainCategory.EMOTE | MainCategory.WEARABLE | WearableCategory | AccessoryCategory | HeadCategory | EmoteCategory
