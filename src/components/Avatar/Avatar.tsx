import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Env } from '@dcl/ui-env'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { WearablePreview } from 'decentraland-ui/dist/components/WearablePreview/WearablePreview'
import Edit from '../../assets/icons/Edit.svg'
import { config } from '../../modules/config'
import { getEditAvatarUrl } from '../../modules/routing/locations'
import { View } from '../../utils/view'
import { Props } from './Avatar.types'
import styles from './Avatar.module.css'

const Avatar = (props: Props) => {
  const { profile, profileAddress, view } = props

  const [isLoadingWearablePreview, setIsLoadingWearablePreview] = useState(true)
  const [isError, setIsError] = useState(false)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const handleOnLoad = useCallback(() => {
    setIsLoadingWearablePreview(false)
  }, [setIsLoadingWearablePreview])

  const handleError = useCallback(() => {
    setIsLoadingWearablePreview(false)
    setIsError(true)
  }, [setIsLoadingWearablePreview])

  return (
    <div className={classNames(styles.Avatar, { [styles.loading]: isLoadingWearablePreview, [styles.noProfile]: !profile })}>
      {isLoadingWearablePreview ? (
        <div className={styles.loaderOverlay}>
          <Loader active inline size="huge" />
        </div>
      ) : null}
      {!isError ? (
        <div className={styles.wearablePreview}>
          <WearablePreview
            onLoad={handleOnLoad}
            onError={handleError}
            onUpdate={handleOnLoad}
            panning={false}
            lockBeta={true}
            dev={config.getEnv() === Env.DEVELOPMENT}
            disableBackground={true}
            profile={profileAddress}
          />
          {(!profile && view === View.OWN && !isLoadingWearablePreview) || isError ? (
            <div data-testid="avatar-message" className={styles.message}>
              {t('avatar.message')}
            </div>
          ) : null}
        </div>
      ) : null}
      {view === View.OWN && (
        <Button
          primary
          fluid
          className={classNames('customIconButton', styles.editButton)}
          as={Link}
          to={getEditAvatarUrl()}
          target="_blank"
        >
          <img src={Edit} className="iconSize" />
          {!isTabletAndBelow && ` ${t('avatar.edit')}`}
        </Button>
      )}
    </div>
  )
}

export default Avatar
