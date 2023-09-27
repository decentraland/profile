import React, { useCallback, useMemo } from 'react'
import { Rarity } from '@dcl/schemas'
import { NFTFilters } from '../NFTFilters'
import { usePagination } from '../../lib/pagination'
import { NFTCategory, NFTOptions } from '../../modules/nfts/types'
import { InfiniteScroll } from '../InfiniteScroll'
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

  const onChangePage = useCallback(
    (newPage: number) => {
      if (newPage > page) {
        goToPage(newPage)
      }
    },
    [page]
  )

  const onChangeFilter = useCallback((filters: Partial<NFTOptions>) => {
    (Object.keys(filters) as (keyof NFTOptions)[]).forEach((key) => {
      let value: string | string[] | number = filters[key] || ''
      if (Array.isArray(value)) {
        value.join(',')
      }
      changeFilter(key, value.toString())
    })
  }, [])

  const nftFilters = useMemo(() => ({
    category: filters.category as NFTCategory,
    itemRarities: filters.itemRarities?.split(',') as Rarity[]
  }), [filters])

  return (
    <div className={styles.container}>
      <NFTFilters filters={nftFilters} onChange={onChangeFilter} />
      <div>ASSETS</div>
      <InfiniteScroll
        page={page}
        maxScrollPages={3}
        hasMorePages={hasMorePages ?? false}
        isLoading={isLoading}
        onLoadMore={onChangePage}
      />
    </div>
  )
}
