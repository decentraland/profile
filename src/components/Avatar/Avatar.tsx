import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { WearablePreview } from 'decentraland-ui/dist/components/WearablePreview/WearablePreview'
import Edit from '../../assets/icons/Edit.svg'
import { config } from '../../modules/config'
import { EDIT_PROFILE_URL } from './consts'
import { Props } from './Avatar.types'
import styles from './Avatar.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')

const Avatar = (props: Props) => {
  const { profile, loggedInAddress } = props
  const avatar = profile?.avatars[0]

  return (
    <div className={styles.Avatar}>
      {avatar?.ethAddress && <WearablePreview disableBackground={true} profile={avatar.ethAddress} />}
      {loggedInAddress === avatar?.ethAddress && (
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
