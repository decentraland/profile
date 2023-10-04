import React, { useCallback, useMemo, useState } from 'react'
import { ItemSortBy, Rarity } from '@dcl/schemas'
import { AssetStatus, AssetStatusFilter } from 'decentraland-dapps/dist/containers'
import { RarityFilter } from 'decentraland-dapps/dist/containers/RarityFilter'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { useAssetStatusFilter, useCategoriesFilter, useRaritiesFilter } from '../../../hooks/filters'
import { usePagination } from '../../../lib/pagination'
import { ItemCategory, ItemSaleStatus, Options } from '../../../modules/items/types'
import { ITEMS_PER_PAGE } from '../../Assets/constants'
import { buildCategoryFilterCategories } from '../../Creations/utils'
import FiltersModal from '../FiltersModal'
import { Props } from './CreationsFiltersModal.types'
import styles from './CreationsFiltersModal.module.css'

const CreationsFiltersModal = (props: Props) => {
  const { filters, changeFilters } = usePagination<keyof Options, ItemSortBy>({
    pageSize: ITEMS_PER_PAGE
  })
  const [category, getCategoriesFilterValue] = useCategoriesFilter(filters.category)
  const [rarities, getRaritiesFilterValue] = useRaritiesFilter(filters.rarities)
  const [status, getItemSaleStatus, getAssetStatusFilterValue] = useAssetStatusFilter(filters.status)
  const [filtersToChange, setFiltersToChange] = useState<Pick<Options, 'category' | 'rarities' | 'status'>>({ category, rarities, status })

  const categories = useMemo(() => buildCategoryFilterCategories(), [])

  const handleApplyFilters = useCallback(() => {
    changeFilters({
      category: filtersToChange.category ? getCategoriesFilterValue(filtersToChange.category) : filtersToChange.category,
      rarities: filtersToChange.rarities ? getRaritiesFilterValue(filtersToChange.rarities) : filtersToChange.rarities,
      status: filtersToChange.status
    })
  }, [filtersToChange, getRaritiesFilterValue, getCategoriesFilterValue, changeFilters])

  const handleChangeCategory = useCallback(
    (category: string) => {
      setFiltersToChange({ ...filtersToChange, category: category as ItemCategory })
    },
    [filtersToChange]
  )
  const handleChangeRarity = useCallback(
    (rarities: string[]) => {
      setFiltersToChange({ ...filtersToChange, rarities: rarities as Rarity[] })
    },
    [filtersToChange]
  )
  const handleChangeStatus = useCallback(
    (value: AssetStatus) => {
      console.log('Changing status')
      setFiltersToChange({ ...filtersToChange, status: getItemSaleStatus(value) })
    },
    [setFiltersToChange]
  )

  const handleClearFilters = useCallback(() => {
    setFiltersToChange({ category: undefined, rarities: undefined })
  }, [setFiltersToChange])

  return (
    <FiltersModal clearFilters={handleClearFilters} applyFilters={handleApplyFilters} {...props}>
      <CategoryFilter
        title={t('categories_menu.title')}
        items={categories}
        value={filtersToChange.category ?? 'wearable'}
        onClick={handleChangeCategory}
      />
      <RarityFilter className={styles.rarity} rarities={filtersToChange.rarities ?? []} onChange={handleChangeRarity} />
      <AssetStatusFilter
        className={styles.status}
        value={getAssetStatusFilterValue(filtersToChange.status ?? ItemSaleStatus.ON_SALE)}
        onChange={handleChangeStatus}
      />
    </FiltersModal>
  )
}

export default CreationsFiltersModal
