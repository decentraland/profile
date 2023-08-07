import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Item } from '@dcl/schemas'
import { AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Button } from 'decentraland-ui'
import shirt from '../../assets/images/shirt.svg'
import { config } from '../../modules/config'
import { getAvatarName } from '../../modules/profile/utils'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { isLoading, items, onFetchItems, wearableIds, className, profileAddress, loggedInAddress, profile } = props

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const isLoggedInProfile = profileAddress === loggedInAddress
  const avatarName = getAvatarName(profile?.avatars[0])

  useEffect(() => {
    if (wearableIds.length > 0) {
      onFetchItems(wearableIds)
    }
  }, [wearableIds])

  return (
    <div className={classNames(className)}>
      {isLoading ? (
        <Loader active />
      ) : items.length > 0 ? (
        <div className={classNames(styles.Overview, isTabletAndBelow && styles.OverviewMobile)}>
          {items.map((item: Item) => (
            <a href={`${MARKETPLACE_URL}${item.url}`} rel="noopener noreferrer" target="_blank" key={item.id}>
              <AssetCard asset={item} assetFilters={{} as AssetCardFilters} />
            </a>
          ))}
        </div>
      ) : (
        <div className={classNames(styles.emptyItems, isTabletAndBelow && styles.emptyItemsMobile)} data-testid="overview-empty">
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
