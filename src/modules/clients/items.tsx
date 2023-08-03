import { Item, ItemFilters } from '@dcl/schemas'
import { BaseClient } from 'decentraland-dapps/dist/lib/BaseClient'

export class ItemAPI extends BaseClient {
  async get(filters: ItemFilters = {}): Promise<Item[]> {
    const queryParams = this._buildItemsQueryString(filters)
    return this.fetch(`/v1/catalog?${queryParams}`)
  }

  private _buildItemsQueryString(filters: ItemFilters): string {
    const queryParams = new URLSearchParams()

    if (filters.ids) {
      filters.ids.forEach(id => queryParams.append('id', id))
    }

    return queryParams.toString()
  }
}
