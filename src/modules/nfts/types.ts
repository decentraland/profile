import { NFT, NFTFilters, Order, RentalListing } from '@dcl/schemas'
import { AccessoryCategory, EmoteCategory, HeadCategory, LandCategory, MainCategory, WearableCategory } from '../../utils/categories'

export type NFTOptions = Pick<NFTFilters, 'first' | 'skip' | 'itemRarities' | 'owner'> & { category?: NFTCategory }

export type NFTCategory = MainCategory | WearableCategory | AccessoryCategory | HeadCategory | EmoteCategory | LandCategory

export type NFTResult = {
  nft: NFT
  order: Order | null
  rental: RentalListing | null
}
