import React, { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { NFTSortBy, Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { NFTCard } from 'decentraland-ui/dist/components/NFTCard/NFTCard'
import { Loader, useMobileMediaQuery, Button } from 'decentraland-ui'
import { usePagination } from '../../lib/pagination'
import { config } from '../../modules/config'
import { NFTCategory, NFTOptions, NFTResult } from '../../modules/nfts/types'
import { getMarketplaceNFTDetailUrl } from '../../modules/routing/locations'
import { MainCategory } from '../../utils/categories'
import { formatWeiToMana } from '../../utils/mana'
import { View } from '../../utils/view'
import { InfiniteScroll } from '../InfiniteScroll'
import InformationBar from '../InformationBar'
import NFTFilters from '../NFTFilters'
import { ITEMS_PER_PAGE } from './constants'
import { buildSortByOptions, getCategoryImage } from './utils'
import { Props } from './Assets.types'
import styles from './Assets.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL')

export default function Assets(props: Props) {
  const isMobile = useMobileMediaQuery()
  const { isLoading, total: count, assets, view, profileAddress, profileName, onFetchAssets, onOpenFiltersModal } = props
  const { first, page, filters, hasMorePages, sortBy, goToPage, changeFilter, changeSorting } = usePagination<keyof NFTOptions>({
    pageSize: ITEMS_PER_PAGE,
    count
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

  const sortOptions = useMemo(() => buildSortByOptions(nftFilters.category), [nftFilters.category])
  const selectedSortBy = useMemo(() => (sortBy as NFTSortBy) ?? NFTSortBy.NEWEST, [sortBy])
  const hasFiltersEnabled = Boolean(sortBy || filters.category || (filters.itemRarities && filters.itemRarities.length))

  useEffect(() => {
    const shouldLoadMultiplePages = !count && page !== 1

    onFetchAssets({
      first: shouldLoadMultiplePages ? page * ITEMS_PER_PAGE : first,
      skip: shouldLoadMultiplePages ? 0 : ITEMS_PER_PAGE * (page - 1),
      category: nftFilters.category,
      itemRarities: nftFilters.itemRarities,
      owner: profileAddress,
      sortBy: selectedSortBy,
      ...(nftFilters.isOnSale ? { isOnSale: true } : {}),
      ...(nftFilters.isWearableSmart ? { isWearableSmart: true } : {})
    })
  }, [page, first, nftFilters, selectedSortBy, profileAddress])

  const onChangePage = useCallback(
    (newPage: number) => {
      if (newPage > page) {
        goToPage(newPage)
      }
    },
    [page, goToPage]
  )

  const onChangeFilter = useCallback(
    (filters: Partial<NFTOptions>) => {
      const filterKeys = Object.keys(filters) as (keyof NFTOptions)[]
      filterKeys.forEach(key => {
        const value = filters[key] || ''
        if (Array.isArray(value)) {
          value.join(',')
        }
        changeFilter(key, value.toString())
      })
    },
    [changeFilter]
  )

  const onChangeSortBy = useCallback(
    (sortOption: NFTSortBy) => {
      changeSorting(sortOption)
    },
    [changeSorting]
  )

  const renderEmptyState = useCallback(() => {
    const actions =
      view === View.OWN ? (
        <Button primary fluid={isMobile} target="_blank" href={MARKETPLACE_URL} size="small">
          {t('assets_tab.go_to_marketplace')}
        </Button>
      ) : null
    return (
      <div className={styles.empty}>
        <div className={styles.message}>
          <img className={styles.image} alt={t(`categories.${nftFilters.category}`)} src={getCategoryImage(nftFilters.category)} />
          <h2 className={styles.title}>
            {t(`assets_tab.${view}_empty_category`, { name: profileName, category: t(`categories.${nftFilters.category}`).toLowerCase() })}
          </h2>
          {actions}
        </div>
      </div>
    )
  }, [isMobile, nftFilters.category, view, profileName])

  return (
    <div className={styles.container}>
      {!isMobile && <NFTFilters filters={nftFilters} onChange={onChangeFilter} />}
      <div className={styles.content}>
        <InformationBar<NFTSortBy>
          className={styles.informationBar}
          isLoading={isLoading}
          count={count}
          sortByOptions={sortOptions}
          sortBy={selectedSortBy}
          hasFiltersEnabled={hasFiltersEnabled}
          onSortByChange={onChangeSortBy}
          getCountText={count => t('assets_tab.assets_count', { count })}
          onOpenFiltersModal={onOpenFiltersModal}
        />
        {isLoading && assets.length === 0 ? (
          <div className={styles.loader}>
            <Loader active />
          </div>
        ) : !isLoading && assets.length === 0 ? (
          renderEmptyState()
        ) : (
          <div role="feed" className={styles.assets}>
            {assets.map((asset: NFTResult) => (
              <NFTCard
                key={asset.nft.id}
                className={classNames('dui-nft-card', styles.card)}
                href={getMarketplaceNFTDetailUrl(asset.nft.contractAddress, asset.nft.tokenId)}
                nft={asset.nft}
                target="_blank"
                price={asset.order?.price !== undefined ? formatWeiToMana(asset.order?.price) : undefined}
              />
            ))}
            <InfiniteScroll
              page={page}
              maxScrollPages={3}
              hasMorePages={hasMorePages ?? false}
              isLoading={isLoading}
              onLoadMore={onChangePage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
