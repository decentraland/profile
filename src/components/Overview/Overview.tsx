import React, { useEffect } from 'react'
import { Item } from '@dcl/schemas'
import { AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { config } from '../../modules/config'
import { getWearableIds } from './utils'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { isLoading, error, items, onFetchItems, profile } = props

  useEffect(() => {
    onFetchItems(getWearableIds(profile?.avatars[0].avatar.wearables ?? []))
  }, [profile])

  return (
    <div className={styles.Overview}>
      {isLoading ? (
        <Loader active />
      ) : error ? (
        <div>ERROR</div>
      ) : (
        items.map((item: Item) => <AssetCard asset={item} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />)
      )}
    </div>
  )
}

export default Overview
