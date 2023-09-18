import React, { useCallback, useEffect, useMemo } from 'react'
import { AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { CategoryFilter } from 'decentraland-ui/dist/components/CategoryFilter/CategoryFilter'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { usePagination } from '../../lib/pagination'
import { config } from '../../modules/config'
import { Categories, Options } from '../../modules/items/types'
import { CREATIONS_DATA_TEST_ID, CREATION_ITEM_DATA_TEST_ID, ITEMS_PER_PAGE, LOADER_DATA_TEST_ID } from './constants'
import { buildCategoryFilterCategories } from './utils'
import { Props } from './Creations.types'
import styles from './Creations.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Creations = (props: Props) => {
  const { items, isLoading, onFetchCreations } = props

  const { page, first, sortBy, filters, changeFilter } = usePagination<keyof Options>()

  const selectedCategory = useMemo(
    () =>
      filters.category && Object.values(Categories).includes(filters.category as Categories)
        ? (filters.category as Categories)
        : Categories.WEARABLES,
    [filters.category]
  )

  useEffect(() => {
    onFetchCreations({
      creator: props.profileAddress,
      first,
      skip: ITEMS_PER_PAGE * (page - 1),
      category: selectedCategory
    })
  }, [page, first, filters, sortBy])

  const categories = useMemo(() => buildCategoryFilterCategories(), [])
  const onChangeCategory = useCallback((value: string) => {
    changeFilter('category', value)
  }, [])

  return (
    <div data-testid={CREATIONS_DATA_TEST_ID}>
      {isLoading ? (
        <Loader active data-testid={LOADER_DATA_TEST_ID} />
      ) : (
        <div className={styles.creations}>
          <div className={styles.sidebar}>
            <CategoryFilter title={t('categories_menu.title')} items={categories} value={selectedCategory} onClick={onChangeCategory} />
          </div>
          <div className={styles.items}>
            {items.map(item => (
              <a
                href={`${MARKETPLACE_URL}${item.url}`}
                target="_blank"
                key={item.id}
                data-testid={`${CREATION_ITEM_DATA_TEST_ID}-${item.id}`}
              >
                <AssetCard asset={item} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Creations
