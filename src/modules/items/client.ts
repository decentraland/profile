import { EmoteCategory, Item, NFTCategory, WearableCategory } from '@dcl/schemas'
import { MainCategory } from '../../utils/categories'
import { ItemCategory, Options } from './types'

export class ItemsClient {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async get(options: Options = {}): Promise<{ data: Item[]; total: number }> {
    const queryParams = this._buildItemsQueryString(options)
    const url = new URL(this.url)
    url.pathname = '/v1/catalog'
    url.search = queryParams.toString()
    const response = await fetch(url.toString())
    return response.json()
  }

  getCategories(
    category: ItemCategory
  ): { category: NFTCategory; wearableCategory?: WearableCategory; emoteCategory?: EmoteCategory } | undefined {
    if (category === MainCategory.WEARABLE) {
      return { category: NFTCategory.WEARABLE }
    } else if (category === MainCategory.EMOTE) {
      return { category: NFTCategory.EMOTE }
    }

    if (category.startsWith('wearable')) {
      return { category: NFTCategory.WEARABLE, wearableCategory: category.replace('wearable_', '') as WearableCategory }
    } else if (category.startsWith('emote')) {
      return { category: NFTCategory.EMOTE, emoteCategory: category.replace('emote_', '') as EmoteCategory }
    }
  }

  private _buildItemsQueryString(filters: Options): URLSearchParams {
    const queryParams = new URLSearchParams()
    const categories = filters.category ? this.getCategories(filters.category) : undefined

    if (filters.first) {
      queryParams.append('first', filters.first.toString())
    }

    if (filters.skip) {
      queryParams.append('skip', filters.skip.toString())
    }

    if (filters.ids) {
      filters.ids.forEach(id => queryParams.append('id', id))
    }

    if (filters.network) {
      queryParams.append('network', filters.network)
    }

    if (filters.urns) {
      filters.urns.forEach(urn => queryParams.append('urn', urn))
    }

    if (filters.creator) {
      const creators = Array.isArray(filters.creator) ? filters.creator : [filters.creator]
      creators.forEach(creator => queryParams.append('creator', creator))
    }

    if (filters.rarities) {
      filters.rarities.forEach(rarity => queryParams.append('rarity', rarity))
    }

    if (categories) {
      queryParams.append('category', categories.category)
      if (categories.emoteCategory) {
        queryParams.append('emoteCategory', categories.emoteCategory)
      } else if (categories.wearableCategory) {
        queryParams.append('wearableCategory', categories.wearableCategory)
      }
    }

    if (filters.sortBy) {
      queryParams.append('sortBy', filters.sortBy)
    }

    return queryParams
  }
}
