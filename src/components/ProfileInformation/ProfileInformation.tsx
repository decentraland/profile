import React, { useCallback } from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import People from '../../assets/icons/People.svg'
import Share from '../../assets/icons/Share.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import { config } from '../../modules/config/config'
import { getAvatarName } from '../../modules/profile/utils'
import copyText from '../../utils/copyText'
import { useTimer } from '../../utils/timer'
import { EDIT_PROFILE_URL } from '../Avatar/consts'
import CopyIcon from '../CopyIcon'
import FriendshipButton from '../FriendshipButton'
import WorldsButton from '../WorldsButton'
import { shareButtonTestId, twitterURL } from './consts'
import { Props } from './ProfileInformation.types'
import styles from './ProfileInformation.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')
const PROFILE_URL = config.get('PROFILE_URL', '')

const ProfileInformation = (props: Props) => {
  const { profile, isSocialClientReady, loggedInAddress, profileAddress } = props

  const [hasCopiedAddress, setHasCopied] = useTimer(1200)

  const avatar = profile?.avatars[0]

  const handleCopyLink = useCallback(() => {
    const url = `${PROFILE_URL}${avatar?.ethAddress}`
    copyText(url, setHasCopied)
  }, [setHasCopied, avatar])

  const isLoggedInProfile = loggedInAddress === profileAddress
  const avatarName = getAvatarName(avatar)
  const shouldShowFriendsButton = !isLoggedInProfile && loggedInAddress && isSocialClientReady

  return (
    <div className={styles.ProfileInformation}>
      <div className={styles.basicRow}>
        <Profile size="massive" imageOnly address={avatar ? avatar.ethAddress : ''} />
        <div className={styles.avatar}>
          <span className={styles.userNumber}>
            <span className={styles.userName} data-testid={avatar?.ethAddress}>
              {avatarName.name}
            </span>
            {avatarName.lastPart ? <span>&nbsp; {avatarName.lastPart}</span> : null}
          </span>
          <div className={styles.wallet}>
            <img src={Wallet} className="iconSize" />
            <Profile textOnly address={avatar ? avatar.ethAddress : profileAddress} />
            <Button basic onClick={handleCopyLink} className={styles.copyLink}>
              <CopyIcon />
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
          {avatar && <span className={styles.description}>{avatar.description}</span>}
        </div>
      </div>
      <div className={styles.actions}>
        {shouldShowFriendsButton ? <FriendshipButton friendAddress={loggedInAddress} /> : null}
        {loggedInAddress ? <WorldsButton address={loggedInAddress} /> : null}
        <Dropdown
          className={styles.smallButton}
          icon={
            <Button primary className={styles.smallButton} data-testid={shareButtonTestId}>
              <img src={Share} className="iconSize" />
            </Button>
          }
          direction="left"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon={<CopyIcon color="white" />}
              text={hasCopiedAddress ? ` ${t('profile_information.copied')}` : ` ${t('profile_information.copy_link')}`}
              onClick={handleCopyLink}
            />
            <Dropdown.Item
              as={'a'}
              icon={<img src={Twitter} className={styles.dropdownMenuIcon} />}
              text={` ${t('profile_information.share_on_tw')}`}
              href={`${twitterURL}${encodeURIComponent(`${t('profile_information.tw_message')} ${PROFILE_URL}${avatar?.ethAddress}`)}`}
              target="_blank"
            />
          </Dropdown.Menu>
        </Dropdown>
        {isLoggedInProfile && (
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
        )}
      </div>
    </div>
  )
}

export default ProfileInformation
