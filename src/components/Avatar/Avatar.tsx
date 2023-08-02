import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Env } from '@dcl/ui-env'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { WearablePreview } from 'decentraland-ui/dist/components/WearablePreview/WearablePreview'
import Edit from '../../assets/icons/Edit.svg'
import DefaultMan from '../../assets/images/DefaultMan.png'
import { config } from '../../modules/config'
import { EDIT_PROFILE_URL } from './consts'
import { Props } from './Avatar.types'
import styles from './Avatar.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')

const Avatar = (props: Props) => {
  const { profile, loggedInAddress } = props
  const [isLoadingWearablePreview, setIsLoadingWearablePreview] = useState(true)
  const [isError, setIsError] = useState(false)
  const avatar = profile?.avatars[0]

  const handleOnLoad = useCallback(() => {
    console.log('Handled load!')
    setIsLoadingWearablePreview(false)
  }, [setIsLoadingWearablePreview])

  const handleError = useCallback(() => {
    console.log('Handled error!')
    setIsLoadingWearablePreview(false)
    setIsError(true)
  }, [setIsLoadingWearablePreview])

  return (
    <div className={classNames(styles.Avatar, isLoadingWearablePreview && styles.loading)}>
      {avatar?.ethAddress && !isError ? (
        <WearablePreview
          onLoad={handleOnLoad}
          onError={handleError}
          dev={config.getEnv() === Env.DEVELOPMENT}
          disableBackground={true}
          profile={avatar.ethAddress}
        />
      ) : (
        <img src={DefaultMan} />
      )}
      {isLoadingWearablePreview ? (
        <div className={styles.loaderOverlay}>
          <Loader active inline size="huge" />
        </div>
      ) : (
        <>
          {loggedInAddress === avatar?.ethAddress && (
            <Button primary fluid className="customIconButton" as={Link} to={`${EXPLORER_URL}${EDIT_PROFILE_URL}`} target="_blank">
              <img src={Edit} className="iconSize" />
              &nbsp;
              {t('avatar.edit')}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Avatar
