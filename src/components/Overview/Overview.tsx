import React, { useEffect } from 'react'
import { Item } from '@dcl/schemas'
import { AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { Button } from 'decentraland-ui'
import shirt from '../../assets/images/shirt.svg'
import { config } from '../../modules/config'
import { getWearableIds } from './utils'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { isLoading, items, onFetchItems, profile } = props

  const wratableIds =
    profile?.avatars[0].avatar.wearables.length &&
    profile?.avatars[0].avatar.wearables.length > 0 &&
    getWearableIds(profile?.avatars[0].avatar.wearables)

  useEffect(() => {
    wratableIds && onFetchItems(wratableIds)
  }, [profile])

  return (
    <>
      {isLoading ? (
        <Loader active />
      ) : wratableIds && items.length > 0 ? (
        <div className={styles.Overview}>
          {items.map((item: Item) => (
            <AssetCard asset={item} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyItems}>
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
