import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Item } from '@dcl/schemas'
import { AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { Button } from 'decentraland-ui'
import shirt from '../../assets/images/shirt.svg'
import { config } from '../../modules/config'
import { getAvatarName } from '../../modules/profile/utils'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { isLoading, items, onFetchItems, wearableIds, className, profileAddress, loggedInAddress, profile } = props

  const isLoggedInProfile = profileAddress === loggedInAddress
  const avatarName = getAvatarName(profile?.avatars[0]).name

  useEffect(() => {
    if (wearableIds.length > 0) {
      onFetchItems(wearableIds)
    }
  }, [wearableIds])

  return (
    <div className={classNames(className, styles.Overview)}>
      {isLoading ? (
        <Loader active />
      ) : items.length > 0 ? (
        <>
          <div className={styles.tabTitle}>{t('overview.title')}</div>
          <div className={classNames(styles.OverviewWithItems)}>
            {items.map((item: Item) => (
              <a href={`${MARKETPLACE_URL}${item.url}`} target="_blank" key={item.id}>
                <AssetCard asset={item} />
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className={classNames(styles.EmptyOverview)} data-testid="overview-empty">
          <img src={shirt} className={styles.emptyIcon} />
          <span className={styles.title}>
            {isLoggedInProfile ? t('overview.start_dressing') : `${avatarName} ${t('overview.no_collectibles')}`}
          </span>
          {isLoggedInProfile && (
            <>
              <span>{t('overview.get_collectibles')}</span>
              <Button inverted as="a" href={MARKETPLACE_URL} target="_blank">
                {t('overview.go_to_marketplace')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Overview
