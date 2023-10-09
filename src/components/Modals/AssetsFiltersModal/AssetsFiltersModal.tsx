import React, { useCallback, useMemo, useState } from 'react'
import { Rarity } from '@dcl/schemas'
import { usePagination } from '../../../lib/pagination'
import { NFTCategory, NFTOptions } from '../../../modules/nfts/types'
import { MainCategory } from '../../../utils/categories'
import { ITEMS_PER_PAGE } from '../../Assets/constants'
import NFTFilters from '../../NFTFilters'
import FiltersModal from '../FiltersModal'
import { Props } from './AssetsFiltersModal.types'
import styles from './AssetsFiltersModal.module.css'

const AssetsFiltersModal = (props: Props) => {
  const { filters, changeFilters } = usePagination<keyof NFTOptions>({
    pageSize: ITEMS_PER_PAGE
  })

  const nftFilters = useMemo(
    () => ({
      category: (filters.category || MainCategory.WEARABLE) as NFTCategory,
      itemRarities: filters.itemRarities?.split(',') as Rarity[],
      isOnSale: filters.isOnSale ? Boolean(filters.isOnSale) : undefined,
      isWearableSmart: filters.isWearableSmart ? Boolean(filters.isWearableSmart) : undefined
    }),
    [filters]
  )

  const [filtersToChange, setFiltersToChange] = useState<Pick<NFTOptions, 'category' | 'itemRarities' | 'isOnSale' | 'isWearableSmart'>>({
    category: nftFilters.category,
    itemRarities: nftFilters.itemRarities,
    isOnSale: nftFilters.isOnSale,
    isWearableSmart: nftFilters.isWearableSmart
  })

  console.log('Filters to change', filtersToChange)

  const onChangeFilter = useCallback((filters: Partial<NFTOptions>) => {
    const newFilters = { ...filtersToChange }
    if ('itemRarities' in filters) {
      newFilters.itemRarities = filters.itemRarities
    }

    if ('category' in filters) {
      newFilters.category = filters.category
    }

    if ('isOnSale' in filters) {
      newFilters.isOnSale = filters.isOnSale
    }

    if ('isWearableSmart' in filters) {
      newFilters.isWearableSmart = filters.isWearableSmart
    }

    setFiltersToChange(newFilters)
  }, [])

  const handleApplyFilters = useCallback(() => {
    changeFilters({
      category: filtersToChange.category,
      itemRarities: filtersToChange.itemRarities?.join(','),
      isOnSale: filtersToChange.isOnSale ? 'true' : undefined,
      isWearableSmart: filtersToChange.isWearableSmart ? 'true' : undefined
    })
  }, [filtersToChange, changeFilters])

  const handleClearFilters = useCallback(() => {
    setFiltersToChange({ category: undefined, itemRarities: undefined, isOnSale: undefined, isWearableSmart: undefined })
  }, [setFiltersToChange])

  return (
    <FiltersModal clearFilters={handleClearFilters} applyFilters={handleApplyFilters} {...props}>
      <NFTFilters className={styles.filters} filters={filtersToChange} onChange={onChangeFilter} />
    </FiltersModal>
  )
}

export default AssetsFiltersModal
