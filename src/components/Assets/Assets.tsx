import React, { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { useMobileMediaQuery } from 'decentraland-ui'
import { usePagination } from '../../lib/pagination'
import { NFTCategory, NFTOptions } from '../../modules/nfts/types'
import { InfiniteScroll } from '../InfiniteScroll'
import { NftFilters } from '../NFTFilters'
import { ITEMS_PER_PAGE } from './constants'
import styles from './Assets.module.css'

export default function Assets() {
  // TODO: Add logic to fetch assets
  const count = 1
  const isLoading = false
  const { page, filters, hasMorePages, goToPage, changeFilter } = usePagination<keyof NFTOptions>({
    pageSize: ITEMS_PER_PAGE,
    count
  })

  const isMobile = useMobileMediaQuery()

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

  const nftFilters = useMemo(
    () => ({
      category: filters.category as NFTCategory,
      itemRarities: filters.itemRarities?.split(',') as Rarity[]
    }),
    [filters]
  )

  return (
    <div className={styles.container}>
      {!isMobile && <NftFilters filters={nftFilters} onChange={onChangeFilter} />}
      <div>ASSETS</div>
      <InfiniteScroll page={page} maxScrollPages={3} hasMorePages={hasMorePages ?? false} isLoading={isLoading} onLoadMore={onChangePage} />
    </div>
  )
}
