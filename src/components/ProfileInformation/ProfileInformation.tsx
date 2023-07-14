import React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import Copy from '../../assets/icons/Copy.svg'
import People from '../../assets/icons/People.svg'
import Share from '../../assets/icons/Share.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import WorldsButton from '../WorldsButton'
import { Props } from './ProfileInformation.types'
import styles from './ProfileInformation.module.css'

const ProfileInformation = (props: Props) => {
  const { profile, isLoggedInProfile = false } = props

  const profileData = profile?.avatars[0]

  return profileData ? (
    <div className={styles.ProfileInformation}>
      <div className={styles.basicRow}>
        <Profile size="massive" imageOnly address={profileData.ethAddress} />
        <div className={styles.profileData}>
          <span className={styles.userNumber}>
            <span className={styles.userName}>{profileData.name}</span>&nbsp; #222
          </span>
          <div className={styles.wallet}>
            <img src={Wallet} className="iconSize" />
            <Profile textOnly address={profileData.ethAddress} />
            <img src={Copy} className="iconSize" />
          </div>
          {isLoggedInProfile && (
            <div className={styles.basicCenteredRow}>
              <img src={People} className="iconSize" />
              {/* TODO: this information should be based on actual friends */}
              {t('profile_information.friends', {
                count: 714
              })}
            </div>
          )}
          <span className={styles.description}>{profileData.description}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <WorldsButton address="0xeDaE96F7739aF8A7fB16E2a888C1E578E1328299" />
        <Button primary className={styles.smallButton}>
          <img src={Share} className="iconSize" />
        </Button>
        <Button inverted className={styles.smallButton}>
          <Icon name="ellipsis horizontal"></Icon>
        </Button>
      </div>
    </div>
  ) : null
}

export default ProfileInformation
