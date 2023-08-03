import { Item, ItemFilters } from '@dcl/schemas'

export class ItemAPI {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async get(filters: ItemFilters = {}): Promise<{ data: Item[] }> {
    const queryParams = this._buildItemsQueryString(filters)
    const response = await fetch(`${this.url}/catalog?${queryParams}`)
    return await response.json()
  }

  private _buildItemsQueryString(filters: ItemFilters): string {
    const queryParams = new URLSearchParams()

    if (filters.ids) {
      filters.ids.forEach(id => queryParams.append('id', id))
    }

    return queryParams.toString()
  }
}
