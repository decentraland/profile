import React, { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { RarityFilter } from 'decentraland-dapps/dist/containers'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { NFTCategory } from '../../modules/nfts/types'
import { MainCategory, getAllCategories } from '../../utils/categories'
import { Props } from './NFTFilters.types'
import { buildCategoryFilterCategories } from './utils'
import styles from './NFTFilters.module.css'

export function NFTFilters({ filters, onChange }: Props) {
  // category
  const categories = useMemo(() => buildCategoryFilterCategories(), [])
  const selectedCategory = useMemo(() => {
    if (filters.category && getAllCategories(false).includes(filters.category)) {
      return filters.category
    }
    return MainCategory.WEARABLE
  }, [filters.category])

  const onChangeCategory = useCallback((id: string) => {
    onChange({ category: id as NFTCategory })
  }, [])

  // itemRarities
  const selectedRarities = useMemo(
    () => (filters.itemRarities ? filters.itemRarities.filter(rarity => Object.values(Rarity).includes(rarity)) : []),
    [filters.itemRarities]
  )
  const onChangeRarity = useCallback((rarities: Rarity[]) => {
    onChange({ itemRarities: rarities })
  }, [])

  const rarityFilter = <RarityFilter key="rarities" rarities={selectedRarities} onChange={onChangeRarity} />

  let categorySpecificFilters: Array<React.ReactNode> = []
  if (selectedCategory.includes(MainCategory.WEARABLE) || selectedCategory.includes(MainCategory.EMOTE)) {
    categorySpecificFilters = [rarityFilter]
  }
  return (
    <div className={styles.container}>
      <CategoryFilter title={t('categories_menu.title')} items={categories} value={selectedCategory} onClick={onChangeCategory} />
      {categorySpecificFilters}
    </div>
  )
}
