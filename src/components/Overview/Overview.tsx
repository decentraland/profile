import React, { useEffect } from 'react'
import { Item } from '@dcl/schemas'
import { AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { Button } from 'decentraland-ui'
import shirt from '../../assets/images/shirt.svg'
import { config } from '../../modules/config'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { isLoading, items, onFetchItems, wearableIds } = props

  useEffect(() => {
    if (wearableIds.length > 0) {
      onFetchItems(wearableIds)
    }
  }, [wearableIds])

  return (
    <>
      {isLoading ? (
        <Loader active />
      ) : items.length > 0 ? (
        <div className={styles.Overview}>
          {items.map((item: Item) => (
            <a href={`${MARKETPLACE_URL}${item.url}`} rel="noopener noreferrer" target="_blank">
              <AssetCard asset={item} assetFilters={{} as AssetCardFilters} key={item.id} />
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.emptyItems} data-testid="overview-empty">
          <img src={shirt} className={styles.emptyIcon} />
          <span className={styles.title}>{t('overview.start_dressing')}</span>
          <span>{t('overview.get_collectibles')}</span>
          <Button inverted as="a" href={MARKETPLACE_URL} target="_blank">
            {t('overview.go_to_marketplace')}
          </Button>
        </div>
      )}
    </>
  )
}

export default Overview
