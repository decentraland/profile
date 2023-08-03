import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Env } from '@dcl/ui-env'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { WearablePreview } from 'decentraland-ui/dist/components/WearablePreview/WearablePreview'
import Edit from '../../assets/icons/Edit.svg'
import { config } from '../../modules/config'
import { EDIT_PROFILE_URL } from './consts'
import { Props } from './Avatar.types'
import styles from './Avatar.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')

const Avatar = (props: Props) => {
  const { profile, profileAddress, isLoggedIn } = props
  const [isLoadingWearablePreview, setIsLoadingWearablePreview] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleOnLoad = useCallback(() => {
    setIsLoadingWearablePreview(false)
  }, [setIsLoadingWearablePreview])

  const handleError = useCallback(() => {
    setIsLoadingWearablePreview(false)
    setIsError(true)
  }, [setIsLoadingWearablePreview])

  return (
    <div className={classNames(styles.Avatar, isLoadingWearablePreview && styles.loading)}>
      {!profile || isError ? (
        <>
          <div className={styles.noProfile}>
            {!profile && isLoggedIn ? <div className={styles.message}>Edit your avatar in Decentraland</div> : null}
          </div>
        </>
      ) : isLoadingWearablePreview ? (
        <div className={styles.loaderOverlay}>
          <Loader active inline size="huge" />
        </div>
      ) : null}

      {profile && !isError ? (
        <WearablePreview
          onLoad={handleOnLoad}
          onError={handleError}
          onUpdate={handleOnLoad}
          dev={config.getEnv() === Env.DEVELOPMENT}
          disableBackground={true}
          profile={profileAddress}
        />
      ) : null}
      {isLoggedIn && (
        <Button primary fluid className="customIconButton" as={Link} to={`${EXPLORER_URL}${EDIT_PROFILE_URL}`} target="_blank">
          <img src={Edit} className="iconSize" />
          &nbsp;
          {t('avatar.edit')}
        </Button>
      )}
    </div>
  )
}

export default Avatar
