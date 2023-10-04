import { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { AssetStatus } from 'decentraland-dapps/dist/containers'
import { ItemCategory, ItemSaleStatus } from '../modules/items/types'
import { MainCategory, getAllCategories } from '../utils/categories'

/**
 * Hook that receives the rarities value from the URL and facilitates the conversion between the value and its query string.
 * @param rarities - The processed rarities from the query string URL.
 * @returns The selected rarities and the function to convert the rarities into a query string.
 */
export const useRaritiesFilter = (rarities: string | null | undefined): [Rarity[], (raritiesToSet: Rarity[]) => string] => {
  const selectedRarities = useMemo(() => rarities?.split(',') ?? [], [rarities]) as Rarity[]
  const getFilterQueryString = useCallback((raritiesToSet: Rarity[]) => raritiesToSet.join(','), [])
  return [selectedRarities, getFilterQueryString]
}

/**
 * Hook that receives the categories value from the URL and facilitates the conversion between the value and its query string.
 * @param categories - The processed categories from the query string URL.
 * @returns The selected categories and the function to convert the categories into a query string.
 */
export const useCategoriesFilter = (category: string | null | undefined): [ItemCategory, (categoryToSet: string) => string] => {
  const selectedCategory = useMemo(
    () => (category && getAllCategories(true).includes(category as ItemCategory) ? (category as ItemCategory) : MainCategory.WEARABLE),
    [category]
  )
  const getFilterQueryString = useCallback((categoryToSet: string) => categoryToSet, [])

  return [selectedCategory, getFilterQueryString]
}

/**
 * Hook that receives the status value from the URL and facilitates the conversion between the value and its query string.
 * @param assetStatus - The processed asset sale status from the query string URL.
 * @returns The selected status, the function to convert the categories into a query string and a function to convert between the assets status component values and the client ones.
 */
export const useAssetStatusFilter = (
  assetStatus: string | null | undefined
): [ItemSaleStatus, (assetStatusToSet: AssetStatus) => ItemSaleStatus, (assetStatusToSet: ItemSaleStatus) => AssetStatus] => {
  const selectedStatus = useMemo(() => (assetStatus as ItemSaleStatus) ?? ItemSaleStatus.ON_SALE, [assetStatus])
  const getItemSaleStatusQueryString = useCallback(
    (assetStatusToSet: AssetStatus) => convertAssetStatusToItemSaleStatus(assetStatusToSet),
    []
  )
  const getAssetStatusFilterValue = useCallback(
    (itemStatusToSet: ItemSaleStatus) => convertItemSaleStatusToAssetStatus(itemStatusToSet),
    []
  )

  return [selectedStatus, getItemSaleStatusQueryString, getAssetStatusFilterValue]
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
