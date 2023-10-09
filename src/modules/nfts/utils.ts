import { AccessoryCategory, EmoteCategory, HeadCategory, LandCategory, MainCategory, WearableCategory } from '../../utils/categories'
import { NFTCategory, NFTOptions } from './types'

function getFiltersForCategory(category: NFTCategory): Record<string, string> {
  let properties = {}
  if (category.includes(MainCategory.LAND)) {
    properties = { ...properties, isLand: 'true' }

    if (Object.values(LandCategory).includes(category as LandCategory)) {
      properties = { ...properties, category: category.replace('land_', '') }
    }
  }

  if (category.includes(MainCategory.EMOTE)) {
    properties = { category: MainCategory.EMOTE }

    if (Object.values(EmoteCategory).includes(category as EmoteCategory)) {
      properties = { ...properties, emoteCategory: category.replace('emote_', '') }
    }
  }

  if (category.includes(MainCategory.WEARABLE)) {
    properties = { category: MainCategory.WEARABLE }

    const WEARABLE_CATEGORIES = [...Object.values(WearableCategory), ...Object.values(AccessoryCategory), ...Object.values(HeadCategory)]

    if (WEARABLE_CATEGORIES.includes(category as WearableCategory | AccessoryCategory | HeadCategory)) {
      properties = { ...properties, wearableCategory: category.replace('wearable_', '') }
    }
  }

  if (category === MainCategory.ENS) {
    properties = { category: MainCategory.ENS }
  }

  return properties
}

export function buildNftQueryString(options: NFTOptions): string {
  const queryParams = new URLSearchParams()
  if (options.first !== undefined) {
    queryParams.append('first', options.first.toString())
  }

  if (options.skip !== undefined) {
    queryParams.append('skip', options.skip.toString())
  }

  if (options.sortBy) {
    queryParams.append('sortBy', options.sortBy)
  }

  if (options.owner) {
    queryParams.append('owner', options.owner)
  }

  if (options.itemRarities?.length) {
    options.itemRarities.forEach(rarity => queryParams.append('itemRarity', rarity))
  }

  if (options.isOnSale) {
    queryParams.append('isOnSale', options.isOnSale.toString())
  }

  if (options.category) {
    const categoryParams = getFiltersForCategory(options.category)
    Object.keys(categoryParams).forEach(param => queryParams.append(param, categoryParams[param]))
  }

  if (options.isWearableSmart) {
    queryParams.append('isWearableSmart', 'true')
  }

  return queryParams.toString()
}
