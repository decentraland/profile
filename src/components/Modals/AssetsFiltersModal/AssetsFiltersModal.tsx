import React, { useCallback, useMemo, useState } from 'react'
import { Rarity } from '@dcl/schemas'
import { usePagination } from '../../../lib/pagination'
import { NFTCategory, NFTOptions } from '../../../modules/nfts/types'
import { MainCategory } from '../../../utils/categories'
import { ITEMS_PER_PAGE } from '../../Assets/constants'
import { NftFilters } from '../../NFTFilters'
import FiltersModal from '../FiltersModal'
import { Props } from './AssetsFiltersModal.types'
import styles from './AssetsFilterModal.module.css'

const AssetsFiltersModal = (props: Props) => {
  const { filters, changeFilters } = usePagination<keyof NFTOptions>({
    pageSize: ITEMS_PER_PAGE
  })

  const nftFilters = useMemo(
    () => ({
      category: (filters.category || MainCategory.WEARABLE) as NFTCategory,
      itemRarities: filters.itemRarities?.split(',') as Rarity[]
    }),
    [filters]
  )

  const [filtersToChange, setFiltersToChange] = useState<Pick<NFTOptions, 'category' | 'itemRarities'>>({
    category: nftFilters.category,
    itemRarities: nftFilters.itemRarities
  })

  const onChangeFilter = useCallback((filters: Partial<NFTOptions>) => {
    const newFilters = { ...filtersToChange }
    if ('itemRarities' in filters) {
      newFilters.itemRarities = filters.itemRarities
    }

    if ('category' in filters) {
      newFilters.category = filters.category
    }

    setFiltersToChange(newFilters)
  }, [])

  const handleApplyFilters = useCallback(() => {
    changeFilters({
      category: filtersToChange.category,
      itemRarities: filtersToChange.itemRarities?.join(',')
    })
  }, [filtersToChange, changeFilters])

  const handleClearFilters = useCallback(() => {
    setFiltersToChange({ category: undefined, itemRarities: undefined })
  }, [setFiltersToChange])

  return (
    <FiltersModal clearFilters={handleClearFilters} applyFilters={handleApplyFilters} {...props}>
      <NftFilters className={styles.filters} filters={filtersToChange} onChange={onChangeFilter} />
    </FiltersModal>
  )
}

export default AssetsFiltersModal
