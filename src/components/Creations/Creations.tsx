import React, { useCallback, useEffect, useMemo } from 'react'
import { Rarity, ItemSortBy } from '@dcl/schemas'
import { AssetStatus, AssetStatusFilter, SmartWearableFilter } from 'decentraland-dapps/dist/containers'
import { AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { RarityFilter } from 'decentraland-dapps/dist/containers/RarityFilter'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import emoteImage from '../../assets/images/emote.svg'
import noResultsImage from '../../assets/images/noResults.svg'
import shirtImage from '../../assets/images/shirt.svg'
import { useAssetStatusFilter, useCategoriesFilter, useRaritiesFilter } from '../../hooks/filters'
import { usePagination } from '../../lib/pagination'
import { config } from '../../modules/config'
import { Options } from '../../modules/items/types'
import { MainCategory } from '../../utils/categories'
import { View } from '../../utils/view'
import { InfiniteScroll } from '../InfiniteScroll'
import InformationBar from '../InformationBar'
import {
  CREATIONS_CLEAR_FILTERS_DATA_TEST_ID,
  CREATIONS_DATA_TEST_ID,
  CREATION_ITEM_DATA_TEST_ID,
  ITEMS_PER_PAGE,
  LOADER_DATA_TEST_ID,
  SMART_WEARABLE_FILTER
} from './constants'
import { buildCategoryFilterCategories, buildSortByOptions, getCategoryName } from './utils'
import { Props } from './Creations.types'
import styles from './Creations.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')
const BUILDER_URL = config.get('BUILDER_URL', '')
const DOCS_URL = config.get('DOCS_URL', '')

const Creations = (props: Props) => {
  const { items, profileName, totalItems: count, isLoading, view, onFetchCreations, onOpenMobileFilters } = props

  const isMobile = useMobileMediaQuery()
  const { page, first, sortBy, filters, hasMorePages, goToPage, changeFilter, changeFilters, changeSorting } = usePagination<
    keyof Options,
    ItemSortBy
  >({
    pageSize: ITEMS_PER_PAGE,
    count
  })

  const [category, getCategoriesQueryString] = useCategoriesFilter(filters.category)
  const [rarities, getRaritiesQueryString] = useRaritiesFilter(filters.rarities)
  const [status, , getAssetStatusQueryString] = useAssetStatusFilter(filters.status)
  const selectedCategoryName = useMemo(() => getCategoryName(category), [category])
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
      status,
      ...(filters.isWearableSmart === 'true' ? { isWearableSmart: true } : {})
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
      changeFilter('rarities', getRaritiesQueryString(changedRarities))
    },
    [getRaritiesQueryString, changeFilter]
  )
  const handleSetSW = useCallback(
    (isOnlySmart: boolean) => {
      changeFilter('isWearableSmart', isOnlySmart.toString())
    },
    [changeFilter]
  )
  const handleSetCategory = useCallback(
    (category: string) => {
      changeFilter('category', getCategoriesQueryString(category))
    },
    [getCategoriesQueryString, changeFilter]
  )
  const handleSortByChange = useCallback(
    (value: ItemSortBy) => {
      changeSorting(value)
    },
    [changeFilter]
  )
  const handleChangeStatus = useCallback(
    (value: AssetStatus) => {
      changeFilter('status', value)
    },
    [changeFilter]
  )
  const handleClearFilters = useCallback(() => {
    changeFilters({}, { clearOldFilters: true })
  }, [changeFilters])

  const renderEmptyComponent = useCallback(() => {
    const onlyCategoryIsSelected = !filters.rarities && !filters.status && !filters.isWearableSmart
    const isMainCategory = category === MainCategory.EMOTE || category === MainCategory.WEARABLE
    const parentCategory = selectedCategoryName === 'wearables' ? MainCategory.WEARABLE : MainCategory.EMOTE

    let image: string
    if (onlyCategoryIsSelected) {
      image = selectedCategoryName === 'wearables' ? shirtImage : emoteImage
    } else {
      image = noResultsImage
    }

    return (
      <div className={styles.empty}>
        <div className={styles.message}>
          <div className={styles.image}>
            <img src={image} />
          </div>
          <h2 className={styles.title}>
            {onlyCategoryIsSelected
              ? t(`creations.${view}_empty_${isMainCategory ? 'main' : 'sub'}_category_title`, {
                  name: profileName,
                  category: t(`categories.${category}`).toLocaleLowerCase(),
                  parentCategory: t(`categories.${parentCategory}`).toLocaleLowerCase()
                })
              : t('creations.empty_multiple_filters_title')}
          </h2>
          {view === View.OWN && onlyCategoryIsSelected ? (
            <>
              <p className={styles.text}>
                {t(`creations.own_empty_${isMainCategory ? 'main' : 'sub'}_category_text`, {
                  category: t(`categories.${category}`).toLowerCase(),
                  parentCategory: t(`categories.${parentCategory}`).toLocaleLowerCase()
                })}
              </p>
              <div className={isMainCategory ? styles.mainCategoryActions : styles.subCategoryActions}>
                <Button
                  secondary
                  inverted
                  fluid={isMobile}
                  target="_blank"
                  href={`${DOCS_URL}/creator/wearables-and-emotes/manage-collections/creating-collection/`}
                >
                  {t('creations.own_empty_primary_action')}
                </Button>
                <Button primary fluid={isMobile} target="_blank" href={`${BUILDER_URL}/collections`}>
                  {t('creations.own_empty_secondary_action')}
                </Button>
              </div>
            </>
          ) : !onlyCategoryIsSelected ? (
            <>
              <div className={styles.emptyActions}>
                <Button onClick={handleClearFilters} secondary inverted fluid={isMobile} data-testid={CREATIONS_CLEAR_FILTERS_DATA_TEST_ID}>
                  {t('creations.clear_filters')}
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    )
  }, [selectedCategoryName, view, profileName, category, isMobile, filters, handleClearFilters])

  return (
    <div data-testid={CREATIONS_DATA_TEST_ID}>
      <div className={styles.main}>
        {!isMobile ? (
          <div className={styles.sidebar}>
            <CategoryFilter i18n={{ title: t('categories_menu.title') }} items={categories} value={category} onClick={handleSetCategory} />
            <RarityFilter rarities={rarities} onChange={handleSetRarity} />
            {selectedCategoryName === 'wearables' ? (
              <SmartWearableFilter
                isOnlySmart={filters.isWearableSmart === 'true'}
                onChange={handleSetSW}
                data-testid={SMART_WEARABLE_FILTER}
              />
            ) : null}
            <AssetStatusFilter value={getAssetStatusQueryString(status)} onChange={handleChangeStatus} />
          </div>
        ) : null}
        <div className={styles.content}>
          <InformationBar
            className={styles.informationBar}
            isLoading={isLoading}
            count={count}
            sortByOptions={sortByOptions}
            sortBy={selectedSortBy}
            hasFiltersEnabled={hasFiltersEnabled}
            onSortByChange={handleSortByChange}
            getCountText={count => t('creations.items_count', { count })}
            onOpenFiltersModal={onOpenMobileFilters}
          />
          {isLoading && items.length === 0 ? (
            <div className={styles.loader}>
              <Loader active inline size="medium" data-testid={LOADER_DATA_TEST_ID} />
            </div>
          ) : !isLoading && items.length === 0 ? (
            renderEmptyComponent()
          ) : (
            <div role="feed" className={styles.items}>
              {items.map(item => (
                <a
                  href={`${MARKETPLACE_URL}${item.url}`}
                  target="_blank"
                  role="article"
                  key={item.id}
                  data-testid={`${CREATION_ITEM_DATA_TEST_ID}-${item.id}`}
                >
                  <AssetCard asset={item} />
                </a>
              ))}
            </div>
          )}
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
