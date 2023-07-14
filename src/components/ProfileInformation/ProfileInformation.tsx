import { useCallback } from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import Copy from '../../assets/icons/Copy'
import People from '../../assets/icons/People.svg'
import Share from '../../assets/icons/Share.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import { config } from '../../modules/config/config'
import copyText from '../../utils/useCopy'
import { useTimer } from '../../utils/useTimer'
import { EDIT_PROFILE_URL } from '../Avatar/consts'
import { twitterURL } from './contsts'
import { Props } from './ProfileInformation.types'
import styles from './ProfileInformation.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')
const PROFILE_URL = config.get('PROFILE_URL', '')

const ProfileInformation = (props: Props) => {
  const { profile, isLoggedInProfile = false } = props
  const [hasCopiedAddress, setHasCopied] = useTimer(1200)

  const profileData = profile?.avatars[0]

  const handleCopyLink = useCallback(() => {
    const url = `${PROFILE_URL}${profileData?.ethAddress}`
    copyText(url, setHasCopied)
  }, [setHasCopied])

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
            <Button basic onClick={handleCopyLink} className={styles.copyLink}>
              <Copy />
            </Button>
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
        <Button primary className={styles.fluidButton}>
          {t('profile_information.get_a_name')}
        </Button>

        <Dropdown
          className={styles.smallButton}
          icon={
            <Button primary className={styles.smallButton}>
              <img src={Share} className="iconSize" />
            </Button>
          }
          direction="left"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon={<Copy color="white" />}
              text={hasCopiedAddress ? ` ${t('profile_information.copied')}` : ` ${t('profile_information.copy_link')}`}
              onClick={handleCopyLink}
            />
            <Dropdown.Item
              icon={<img src={Twitter} className={styles.dropdownMenuIcon} />}
              text={` ${t('profile_information.share_on_tw')}`}
              href={`${twitterURL}${encodeURIComponent(`${t('profile_information.tw_message')} ${PROFILE_URL}${profileData?.ethAddress}`)}`}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          className={styles.smallButton}
          icon={
            <Button inverted className={styles.smallButton}>
              <Icon name="ellipsis horizontal"></Icon>
            </Button>
          }
          direction="left"
        >
          <Dropdown.Menu>
            <Dropdown.Item icon={'user outline'} text={t('profile_information.edit')} href={`${EXPLORER_URL}${EDIT_PROFILE_URL}`} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  ) : null
}

export default ProfileInformation
