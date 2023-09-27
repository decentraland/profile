import { NFTFilters } from '@dcl/schemas'
import { AccessoryCategory, EmoteCategory, HeadCategory, LandCategory, MainCategory, WearableCategory } from '../../utils/categories'

export type NFTOptions = Pick<NFTFilters, 'first' | 'skip' | 'itemRarities'> & { category?: NFTCategory }

export type NFTCategory = MainCategory | WearableCategory | AccessoryCategory | HeadCategory | EmoteCategory | LandCategory
