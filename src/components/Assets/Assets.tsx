import React, { useCallback, useEffect, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { useMobileMediaQuery } from 'decentraland-ui'
import { usePagination } from '../../lib/pagination'
import { NFTCategory, NFTOptions, NFTResult } from '../../modules/nfts/types'
import { MainCategory } from '../../utils/categories'
import { InfiniteScroll } from '../InfiniteScroll'
import { NftFilters } from '../NFTFilters'
import { ITEMS_PER_PAGE } from './constants'
import { Props } from './Assets.types'
import styles from './Assets.module.css'

export default function Assets(props: Props) {
  const { isLoading, total: count, assets, profileAddress, onFetchAssets } = props
  const { first, page, filters, hasMorePages, goToPage, changeFilter } = usePagination<keyof NFTOptions>({
    pageSize: ITEMS_PER_PAGE,
    count
  })

  const nftFilters = useMemo(
    () => ({
      category: (filters.category || MainCategory.WEARABLE) as NFTCategory,
      itemRarities: filters.itemRarities?.split(',') as Rarity[]
    }),
    [filters]
  )

  const isMobile = useMobileMediaQuery()

  useEffect(() => {
    const shouldLoadMultiplePages = !count && page !== 1

    onFetchAssets({
      first: shouldLoadMultiplePages ? page * ITEMS_PER_PAGE : first,
      skip: shouldLoadMultiplePages ? 0 : ITEMS_PER_PAGE * (page - 1),
      category: nftFilters.category,
      itemRarities: nftFilters.itemRarities,
      owner: profileAddress
    })
  }, [page, first, filters])

  const onChangePage = useCallback(
    (newPage: number) => {
      if (newPage > page) {
        goToPage(newPage)
      }
    },
    [page]
  )

  const onChangeFilter = useCallback((filters: Partial<NFTOptions>) => {
    ;(Object.keys(filters) as (keyof NFTOptions)[]).forEach(key => {
      const value: string | string[] | number = filters[key] || ''
      if (Array.isArray(value)) {
        value.join(',')
      }
      changeFilter(key, value.toString())
    })
  }, [])

  return (
    <div className={styles.container}>
      {!isMobile && <NftFilters filters={nftFilters} onChange={onChangeFilter} />}
      <div className={styles.assets}>
        {isLoading && assets.length === 0 ? (
          <span>LOADING</span>
        ) : (
          assets.map((asset: NFTResult) => <span key={asset.nft.id}>{asset.nft.name}</span>)
        )}
      </div>
      <InfiniteScroll page={page} maxScrollPages={3} hasMorePages={hasMorePages ?? false} isLoading={isLoading} onLoadMore={onChangePage} />
    </div>
  )
}
