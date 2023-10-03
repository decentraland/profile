import { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { ItemCategory } from '../modules/items/types'
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
