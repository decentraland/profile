import React, { useCallback, useEffect, useMemo } from 'react'
import { Rarity, ItemSortBy } from '@dcl/schemas'
import { AssetStatus, AssetStatusFilter } from 'decentraland-dapps/dist/containers'
import { AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { RarityFilter } from 'decentraland-dapps/dist/containers/RarityFilter'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import emoteImage from '../../assets/images/emote.svg'
import shirtImage from '../../assets/images/shirt.svg'
import { useAssetStatusFilter, useCategoriesFilter, useRaritiesFilter } from '../../hooks/filters'
import { usePagination } from '../../lib/pagination'
import { config } from '../../modules/config'
import { Options } from '../../modules/items/types'
import { View } from '../../utils/view'
import { InfiniteScroll } from '../InfiniteScroll'
import InformationBar from '../InformationBar'
import { CREATIONS_DATA_TEST_ID, CREATION_ITEM_DATA_TEST_ID, ITEMS_PER_PAGE, LOADER_DATA_TEST_ID } from './constants'
import { buildCategoryFilterCategories, buildSortByOptions, getCategoryName } from './utils'
import { Props } from './Creations.types'
import styles from './Creations.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')
const BUILDER_URL = config.get('BUILDER_URL', '')
const DOCS_URL = config.get('DOCS_URL', '')

const Creations = (props: Props) => {
  const { items, profileName, totalItems: count, isLoading, view, onFetchCreations, onOpenMobileFilters } = props

  const isMobile = useMobileMediaQuery()
  const { page, first, sortBy, filters, hasMorePages, goToPage, changeFilter, changeSorting } = usePagination<keyof Options, ItemSortBy>({
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
      status
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
  const onChangeStatus = useCallback(
    (value: AssetStatus) => {
      changeFilter('status', value)
    },
    [changeFilter]
  )

  return (
    <div data-testid={CREATIONS_DATA_TEST_ID}>
      <div className={styles.main}>
        {!isMobile ? (
          <div className={styles.sidebar}>
            <CategoryFilter i18n={{ title: t('categories_menu.title') }} items={categories} value={category} onClick={handleSetCategory} />
            <RarityFilter rarities={rarities} onChange={handleSetRarity} />
            <AssetStatusFilter value={getAssetStatusQueryString(status)} onChange={onChangeStatus} />
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
            <div className={styles.empty}>
              <div className={styles.message}>
                <div className={styles.image}>
                  <img src={selectedCategoryName === 'wearables' ? shirtImage : emoteImage} />
                </div>
                <h2 className={styles.title}>{t(`creations.${view}_empty_${selectedCategoryName}_title`, { name: profileName })}</h2>
                {view === View.OWN ? (
                  <>
                    <p className={styles.text}>{t(`creations.own_empty_${selectedCategoryName}_text`, { br: () => <br></br> })}</p>
                    <div className={styles.actions}>
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
                ) : null}
              </div>
            </div>
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
