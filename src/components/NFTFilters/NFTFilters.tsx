import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { Rarity } from '@dcl/schemas'
import { RarityFilter, SmartWearableFilter } from 'decentraland-dapps/dist/containers'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { NFTCategory } from '../../modules/nfts/types'
import { MainCategory, getAllCategories } from '../../utils/categories'
import OnSaleFilter from '../OnSaleFilter'
import { SMART_WEARABLE_FILTER_DATA_TEST_ID } from './constants'
import { buildCategoryFilterCategories } from './utils'
import { Props } from './NFTFilters.types'
import styles from './NFTFilters.module.css'

const NFTFilters = ({ filters, className, onChange }: Props) => {
  // category
  const categories = useMemo(() => buildCategoryFilterCategories(), [])
  const selectedCategory = useMemo(() => {
    if (filters.category && getAllCategories(false).includes(filters.category)) {
      return filters.category
    }
    return MainCategory.WEARABLE
  }, [filters.category])

  const onChangeCategory = useCallback(
    (id: string) => {
      onChange({ category: id as NFTCategory })
    },
    [onChange]
  )

  // itemRarities
  const selectedRarities = useMemo(
    () => (filters.itemRarities ? filters.itemRarities.filter(rarity => Object.values(Rarity).includes(rarity)) : []),
    [filters.itemRarities]
  )
  const onChangeRarity = useCallback(
    (rarities: Rarity[]) => {
      onChange({ itemRarities: rarities })
    },
    [onChange]
  )

  const handleChangeOnSale = useCallback(
    (isOnSale: boolean) => {
      onChange({ isOnSale })
    },
    [onChange]
  )

  const handleChangeIsWearableSmart = useCallback(
    (isWearableSmart: boolean) => {
      onChange({ isWearableSmart })
    },
    [onChange]
  )

  const categorySpecificFilters: Array<React.ReactNode> = useMemo(() => {
    const filterComponents: Array<React.ReactNode> = []
    if (selectedCategory.includes(MainCategory.WEARABLE) || selectedCategory.includes(MainCategory.EMOTE)) {
      const rarityFilter = <RarityFilter key="rarities" rarities={selectedRarities} onChange={onChangeRarity} />
      filterComponents.push(rarityFilter)
    }
    if (selectedCategory.includes(MainCategory.WEARABLE)) {
      const smartWearableFilter = (
        <SmartWearableFilter
          key="smart"
          data-testid={SMART_WEARABLE_FILTER_DATA_TEST_ID}
          isOnlySmart={filters.isWearableSmart ?? false}
          onChange={handleChangeIsWearableSmart}
        />
      )
      filterComponents.push(smartWearableFilter)
    }
    return filterComponents
  }, [selectedCategory, selectedRarities, onChangeRarity, filters.isWearableSmart, handleChangeIsWearableSmart])

  return (
    <div className={classNames(styles.container, className)}>
      <CategoryFilter i18n={{ title: t('categories_menu.title') }} items={categories} value={selectedCategory} onClick={onChangeCategory} />
      {categorySpecificFilters}
      <OnSaleFilter value={filters.isOnSale ?? false} onChange={handleChangeOnSale} />
    </div>
  )
}

export default NFTFilters
