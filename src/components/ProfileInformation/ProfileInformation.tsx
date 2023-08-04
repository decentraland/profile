import React, { useCallback } from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import Share from '../../assets/icons/Share.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import { config } from '../../modules/config/config'
import { getAvatarName, hasAboutInformation } from '../../modules/profile/utils'
import { locations } from '../../modules/routing/locations'
import copyText from '../../utils/copyText'
import { useTimer } from '../../utils/timer'
import { EDIT_PROFILE_URL } from '../Avatar/constants'
import { AvatarLink } from '../AvatarLink'
import CopyIcon from '../CopyIcon'
import FriendsCounter from '../FriendsCounter'
import FriendshipButton from '../FriendshipButton'
import MutualFriendsCounter from '../MutualFriendsCounter'
import WorldsButton from '../WorldsButton'
import { actionsForNonBlockedTestId, blockedButtonTestId, shareButtonTestId, twitterURL } from './constants'
import { Props } from './ProfileInformation.types'
import styles from './ProfileInformation.module.css'

const EXPLORER_URL = config.get('EXPLORER_URL', '')
const PROFILE_URL = config.get('PROFILE_URL', '')
const ADDRESS_SHORTENED_LENGTH = 24

const ProfileInformation = (props: Props) => {
  const { profile, isSocialClientReady, loggedInAddress, profileAddress, isBlockedByLoggedUser, hasBlockedLoggedUser, onViewMore } = props

  const [hasCopiedAddress, setHasCopied] = useTimer(1200)

  const avatar = profile?.avatars[0]

  const handleCopyLink = useCallback(() => {
    const url = `${PROFILE_URL}${locations.account(profileAddress)}`
    copyText(url, setHasCopied)
  }, [setHasCopied, profileAddress])

  const handleViewMore = useCallback(() => {
    avatar && onViewMore && onViewMore(avatar)
  }, [avatar, onViewMore])

  const isLoggedInProfile = loggedInAddress === profileAddress
  const avatarName = getAvatarName(avatar)
  const shouldShowFriendsButton = !isLoggedInProfile && loggedInAddress && isSocialClientReady
  const isBlocked = isBlockedByLoggedUser || hasBlockedLoggedUser
  const shouldShowViewMoreButton = hasAboutInformation(avatar) && !isBlocked

  return (
    <div className={styles.ProfileInformation}>
      <div className={styles.basicRow}>
        <Profile size="massive" imageOnly address={profileAddress} avatar={avatar} />
        <div className={styles.avatar}>
          <span className={styles.userNumber}>
            <span className={styles.userName} data-testid={profileAddress}>
              {avatarName.name}
            </span>
            {avatarName.lastPart ? <span>&nbsp; {avatarName.lastPart}</span> : null}
          </span>
          <div className={styles.wallet}>
            <img src={Wallet} className={styles.walletIcon} />
            {profileAddress.slice(0, ADDRESS_SHORTENED_LENGTH)}...
            <Button basic onClick={handleCopyLink} className={styles.copyLink}>
              <CopyIcon />
            </Button>
          </div>
          {isSocialClientReady && (
            <div className={styles.basicCenteredRow}>
              {isLoggedInProfile ? <FriendsCounter /> : <MutualFriendsCounter friendAddress={profileAddress} />}
            </div>
          )}
          {avatar && <span className={styles.description}>{avatar.description}</span>}
          {shouldShowViewMoreButton && (
            <div className={styles.basicCenteredRow}>
              <Button basic className={styles.viewMore} onClick={handleViewMore}>
                {t('profile_information.view_more')}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          {isBlockedByLoggedUser && (
            <Button inverted className={styles.blockedButton} data-testid={blockedButtonTestId}>
              <Icon name="user times" />
              {t('profile_information.blocked')}
            </Button>
          )}
          {!isBlocked && (
            // The class name is needed to avoid the display block of the div. The div is just for testing purposes
            <div data-testid={actionsForNonBlockedTestId} className={styles.displayContents}>
              {shouldShowFriendsButton ? <FriendshipButton friendAddress={profileAddress} /> : null}
              {loggedInAddress ? <WorldsButton isLoggedIn={isLoggedInProfile} address={profileAddress} /> : null}
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
                    href={`${twitterURL}${encodeURIComponent(
                      `${t('profile_information.tw_message')}${PROFILE_URL}${locations.account(profileAddress)}`
                    )}`}
                    target="_blank"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
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
        {!isBlocked && (
          <div className={styles.links}>
            {avatar?.links?.map((link, index) => (
              <AvatarLink link={link} key={`profile-link-${index}`} collapsed />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInformation
