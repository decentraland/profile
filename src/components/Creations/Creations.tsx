import React, { useCallback, useEffect, useMemo } from 'react'
import { Rarity, ItemSortBy } from '@dcl/schemas'
import { AssetStatus, AssetStatusFilter } from 'decentraland-dapps/dist/containers'
import { AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { RarityFilter } from 'decentraland-dapps/dist/containers/RarityFilter'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { useCategoriesFilter, useRaritiesFilter } from '../../hooks/filters'
import { usePagination } from '../../lib/pagination'
import { config } from '../../modules/config'
import { ItemSaleStatus, Options } from '../../modules/items/types'
import { InfiniteScroll } from '../InfiniteScroll'
import InformationBar from '../InformationBar'
import { CREATIONS_DATA_TEST_ID, CREATION_ITEM_DATA_TEST_ID, ITEMS_PER_PAGE, LOADER_DATA_TEST_ID } from './constants'
import {
  buildCategoryFilterCategories,
  buildSortByOptions,
  convertAssetStatusToItemSaleStatus,
  convertItemSaleStatusToAssetStatus
} from './utils'
import { Props } from './Creations.types'
import styles from './Creations.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Creations = (props: Props) => {
  const { items, totalItems: count, isLoading, onFetchCreations, onOpenMobileFilters } = props

  const isMobile = useMobileMediaQuery()
  const { page, first, sortBy, filters, hasMorePages, goToPage, changeFilter, changeSorting } = usePagination<keyof Options, ItemSortBy>({
    pageSize: ITEMS_PER_PAGE,
    count
  })

  const [category, getCategoriesFilterValue] = useCategoriesFilter(filters.category)
  const [rarities, getRaritiesFilterValue] = useRaritiesFilter(filters.rarities)

  const selectedStatus = useMemo(() => (filters.status as ItemSaleStatus) ?? ItemSaleStatus.ON_SALE, [filters.status])
  const selectedSortBy = sortBy ?? ItemSortBy.NEWEST
  const hasFiltersEnabled = Boolean(sortBy || filters.category || filters.rarities)

  useEffect(() => {
    const shouldLoadMultiplePages = !count && page !== 1

    onFetchCreations({
      creator: props.profileAddress,
      first: shouldLoadMultiplePages ? page * ITEMS_PER_PAGE : first,
      skip: shouldLoadMultiplePages ? 0 : ITEMS_PER_PAGE * (page - 1),
      category,
      rarities,
      sortBy: selectedSortBy,
      status: selectedStatus
    })
  }, [page, first, filters, sortBy])

  const sortByOptions = useMemo(() => buildSortByOptions(), [])
  const categories = useMemo(() => buildCategoryFilterCategories(), [])

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > page) {
        goToPage(newPage)
      }
    },
    [page]
  )
  const handleSetRarity = useCallback(
    (changedRarities: Rarity[]) => {
      changeFilter('rarities', getRaritiesFilterValue(changedRarities))
    },
    [getRaritiesFilterValue, changeFilter]
  )
  const handleSetCategory = useCallback(
    (category: string) => {
      changeFilter('category', getCategoriesFilterValue(category))
    },
    [getCategoriesFilterValue, changeFilter]
  )
  const handleSortByChange = useCallback(
    (value: ItemSortBy) => {
      changeSorting(value)
    },
    [changeFilter]
  )
  const onChangeStatus = useCallback(
    (value: AssetStatus) => {
      changeFilter('status', convertAssetStatusToItemSaleStatus(value))
    },
    [changeFilter]
  )

  return (
    <div data-testid={CREATIONS_DATA_TEST_ID}>
      <div className={styles.main}>
        {!isMobile ? (
          <div className={styles.sidebar}>
            <CategoryFilter title={t('categories_menu.title')} items={categories} value={category} onClick={handleSetCategory} />
            <RarityFilter rarities={rarities} onChange={handleSetRarity} />
            <AssetStatusFilter value={convertItemSaleStatusToAssetStatus(selectedStatus)} onChange={onChangeStatus} />
          </div>
        ) : null}
        <div className={styles.content}>
          <InformationBar
            className={styles.informationBar}
            isLoading={isLoading}
            count={items.length}
            sortByOptions={sortByOptions}
            sortBy={selectedSortBy}
            hasFiltersEnabled={hasFiltersEnabled}
            onSortByChange={handleSortByChange}
            getCountText={count => t('creations.items_count', { count })}
            onOpenFiltersModal={onOpenMobileFilters}
          />
          <div role="feed" className={styles.items}>
            {isLoading && items.length === 0 ? (
              <Loader active data-testid={LOADER_DATA_TEST_ID} />
            ) : (
              items.map(item => (
                <a
                  href={`${MARKETPLACE_URL}${item.url}`}
                  target="_blank"
                  role="article"
                  key={item.id}
                  data-testid={`${CREATION_ITEM_DATA_TEST_ID}-${item.id}`}
                >
                  <AssetCard asset={item} />
                </a>
              ))
            )}
          </div>
          <InfiniteScroll
            page={page}
            maxScrollPages={3}
            hasMorePages={hasMorePages ?? false}
            isLoading={isLoading}
            onLoadMore={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Creations
