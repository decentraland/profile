import { NFTSortBy } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import emoteImage from '../../assets/images/emote.svg'
import landImage from '../../assets/images/land.svg'
import nameImage from '../../assets/images/name.svg'
import wearableImage from '../../assets/images/shirt.svg'
import { NFTCategory } from '../../modules/nfts/types'
import { LandCategory, MainCategory, getEmoteCategories, getLandCategories, getWearableCategories } from '../../utils/categories'

export function getCategoryImage(category: NFTCategory) {
  if (getWearableCategories().includes(category)) {
    return wearableImage
  }

  if (getEmoteCategories().includes(category)) {
    return emoteImage
  }

  if (getLandCategories().includes(category)) {
    return landImage
  }

  return nameImage
}

export function buildSortByOptions(category: NFTCategory) {
  let sortyByOptions = [NFTSortBy.NEWEST, NFTSortBy.NAME, NFTSortBy.CHEAPEST, NFTSortBy.RECENTLY_LISTED, NFTSortBy.RECENTLY_SOLD]

  const isLand = ([MainCategory.LAND, LandCategory.ESTATE, LandCategory.PARCEL] as NFTCategory[]).includes(category)
  if (isLand) {
    sortyByOptions = [...sortyByOptions, NFTSortBy.MAX_RENTAL_PRICE, NFTSortBy.RENTAL_LISTING_DATE]
  }
  return sortyByOptions.map(value => ({ value, text: t(`nfts_sort_by.${value}`) }))
}
