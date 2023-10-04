import { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { AssetStatus } from 'decentraland-dapps/dist/containers'
import { ItemCategory, ItemSaleStatus } from '../modules/items/types'
import { MainCategory, getAllCategories } from '../utils/categories'

export const useRaritiesFilter = (rarities: string | null | undefined): [Rarity[], (raritiesToSet: Rarity[]) => string] => {
  const selectedRarities = useMemo(() => rarities?.split(',') ?? [], [rarities]) as Rarity[]
  const getFilterValue = useCallback((raritiesToSet: Rarity[]) => raritiesToSet.join(','), [])
  return [selectedRarities, getFilterValue]
}

export const useCategoriesFilter = (category: string | null | undefined): [ItemCategory, (categoryToSet: string) => string] => {
  const selectedCategory = useMemo(
    () => (category && getAllCategories(true).includes(category as ItemCategory) ? (category as ItemCategory) : MainCategory.WEARABLE),
    [category]
  )
  const getFilterValue = useCallback((categoryToSet: string) => categoryToSet, [])

  return [selectedCategory, getFilterValue]
}

export const useAssetStatusFilter = (
  assetStatus: string | null | undefined
): [ItemSaleStatus, (assetStatusToSet: AssetStatus) => ItemSaleStatus, (assetStatusToSet: ItemSaleStatus) => AssetStatus] => {
  const selectedStatus = useMemo(() => (assetStatus as ItemSaleStatus) ?? ItemSaleStatus.ON_SALE, [assetStatus])
  const getItemSaleStatusFilterValue = useCallback(
    (assetStatusToSet: AssetStatus) => convertAssetStatusToItemSaleStatus(assetStatusToSet),
    []
  )
  const getAssetStatusFilterValue = useCallback(
    (itemStatusToSet: ItemSaleStatus) => convertItemSaleStatusToAssetStatus(itemStatusToSet),
    []
  )

  return [selectedStatus, getItemSaleStatusFilterValue, getAssetStatusFilterValue]
}

function convertAssetStatusToItemSaleStatus(status: AssetStatus): ItemSaleStatus {
  switch (status) {
    case AssetStatus.ON_SALE:
      return ItemSaleStatus.ON_SALE
    case AssetStatus.ONLY_MINTING:
      return ItemSaleStatus.ONLY_MINTING
    case AssetStatus.ONLY_LISTING:
      return ItemSaleStatus.ONLY_LISTING
    case AssetStatus.NOT_FOR_SALE:
      return ItemSaleStatus.NOT_FOR_SALE
  }
}

function convertItemSaleStatusToAssetStatus(status: ItemSaleStatus): AssetStatus {
  switch (status) {
    case ItemSaleStatus.ON_SALE:
      return AssetStatus.ON_SALE
    case ItemSaleStatus.ONLY_MINTING:
      return AssetStatus.ONLY_MINTING
    case ItemSaleStatus.ONLY_LISTING:
      return AssetStatus.ONLY_LISTING
    case ItemSaleStatus.NOT_FOR_SALE:
      return AssetStatus.NOT_FOR_SALE
  }
}
