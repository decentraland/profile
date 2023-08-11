import React, { useCallback } from 'react'
import classnames from 'classnames'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Popup } from 'decentraland-ui/dist/components/Popup/Popup'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import Share from '../../assets/icons/Share.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import { Events, ShareType } from '../../modules/analytics/types'
import { config } from '../../modules/config/config'
import { getAvatarName, hasAboutInformation } from '../../modules/profile/utils'
import { getEditAvatarUrl, locations } from '../../modules/routing/locations'
import { useTimer } from '../../utils/timer'
import { AvatarLink } from '../AvatarLink'
import CopyIcon from '../CopyIcon'
import FriendsCounter from '../FriendsCounter'
import FriendshipButton from '../FriendshipButton'
import MutualFriendsCounter from '../MutualFriendsCounter'
import WorldsButton from '../WorldsButton'
import {
  MAX_DESCRIPTION_LENGTH,
  actionsForNonBlockedTestId,
  blockedButtonTestId,
  shareButtonTestId,
  twitterURL,
  walletTestId
} from './constants'
import { Props } from './ProfileInformation.types'
import styles from './ProfileInformation.module.css'

const PROFILE_URL = config.get('PROFILE_URL', '')
const MAX_NUMBER_OF_LINKS = 3

const ProfileInformation = (props: Props) => {
  const { profile, isSocialClientReady, loggedInAddress, profileAddress, isBlockedByLoggedUser, hasBlockedLoggedUser, onViewMore } = props

  const [hasCopiedAddress, setHasCopied] = useTimer(1200)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const avatar = profile?.avatars[0]

  const handleCopyLink = useCallback(() => {
    const url = `${PROFILE_URL}${locations.account(profileAddress)}`
    navigator.clipboard.writeText(url)
    setHasCopied()
    getAnalytics().track(Events.SHARE_PROFILE, { type: ShareType.COPY_LINK })
  }, [setHasCopied, profileAddress])

  const handleCopyWallet = useCallback(() => {
    navigator.clipboard.writeText(profileAddress)
    getAnalytics().track(Events.COPY_WALLET_ADDRESS)
  }, [profileAddress])

  const handleShareOnTwitter = useCallback(() => {
    const url = `${twitterURL}${encodeURIComponent(
      `${t('profile_information.tw_message')}${PROFILE_URL}${locations.account(profileAddress)}`
    )}`
    getAnalytics().track(Events.SHARE_PROFILE, {
      type: ShareType.TWITTER
    })
    // Based on SegmentAnalytics track callback implementation
    const timeout = setTimeout(() => {
      window.open(url, '_blank,noreferrer')
    }, 300)

    return () => clearTimeout(timeout)
  }, [profileAddress])

  const handleViewMore = useCallback(() => {
    avatar && onViewMore && onViewMore(avatar)
    getAnalytics().track(Events.VIEW_MORE_ABOUT_PROFILE)
  }, [avatar, onViewMore])

  const isLoggedInProfile = loggedInAddress === profileAddress
  const avatarName = getAvatarName(avatar)
  const shouldShowFriendsButton = !isLoggedInProfile && loggedInAddress && isSocialClientReady
  const isBlocked = !isLoggedInProfile && (isBlockedByLoggedUser || hasBlockedLoggedUser)
  const shouldShowViewMoreButton =
    (hasAboutInformation(avatar) || (avatar?.description?.length ?? 0) > MAX_DESCRIPTION_LENGTH) && !isBlocked

  return (
    <div className={classnames(styles.ProfileInformation)}>
      <div className={classnames(styles.basicRow)}>
        <Profile size="massive" imageOnly address={profileAddress} avatar={avatar} />
        <div className={styles.avatarInformation}>
          <span className={styles.userNumber}>
            <span className={styles.userName} data-testid={profileAddress}>
              {avatarName.name}
            </span>
            {avatarName.lastPart ? <span className={styles.userNameLastPart}>&nbsp; {avatarName.lastPart}</span> : null}
          </span>
          <div className={classnames(styles.column)}>
            <div className={styles.wallet} data-testid={walletTestId}>
              <img src={Wallet} className={styles.walletIcon} />
              {profileAddress.slice(0, 6)}...{profileAddress.slice(-4)}
              <Button basic onClick={handleCopyWallet} className={styles.copyLink}>
                <CopyIcon />
              </Button>
            </div>
            {isSocialClientReady && (
              <div className={styles.basicCenteredRow}>
                {isLoggedInProfile ? <FriendsCounter /> : <MutualFriendsCounter friendAddress={profileAddress} />}
              </div>
            )}
          </div>
          {avatar && (
            <div className={styles.description}>
              {(avatar.description?.length ?? 0) > MAX_DESCRIPTION_LENGTH
                ? avatar.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
                : avatar.description}
            </div>
          )}
          {shouldShowViewMoreButton && (
            <div className={styles.basicCenteredRow}>
              <Button basic className={styles.viewMore} onClick={handleViewMore}>
                {t('profile_information.view_more')}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={classnames(styles.actions)}>
        <div className={classnames(styles.buttons)}>
          {isBlocked && isBlockedByLoggedUser && (
            <Button inverted className={styles.blockedButton} data-testid={blockedButtonTestId}>
              <Icon name="user times" />
              {t('profile_information.blocked')}
            </Button>
          )}
          {!isBlocked && (
            // The class name is needed to avoid the display block of the div. The div is just for testing purposes
            <div data-testid={actionsForNonBlockedTestId} className={styles.displayContents}>
              {shouldShowFriendsButton ? <FriendshipButton className={styles.friendsButton} friendAddress={profileAddress} /> : null}
              {loggedInAddress && !isTabletAndBelow ? <WorldsButton isLoggedIn={isLoggedInProfile} address={profileAddress} /> : null}
              <Dropdown
                className={styles.shareDropdown}
                icon={
                  <Popup
                    content={t('profile_information.share_tooltip')}
                    position="top center"
                    disabled={isTabletAndBelow}
                    trigger={
                      <Button primary className={styles.smallButton} data-testid={shareButtonTestId}>
                        <img src={Share} className="iconSize" />
                      </Button>
                    }
                  />
                }
                direction="left"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon={<CopyIcon color="white" />}
                    text={hasCopiedAddress ? ` ${t('profile_information.copied')}` : ` ${t('profile_information.copy_link')}`}
                    onClick={handleCopyLink}
                    className={styles.copyItem}
                  />
                  <Dropdown.Item
                    icon="twitter"
                    data-testid="share-on-twitter"
                    text={t('profile_information.share_on_tw')}
                    onClick={handleShareOnTwitter}
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
                <Dropdown.Item as="a" icon={'user'} text={t('profile_information.edit')} href={getEditAvatarUrl()} target="_blank" />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        {!isBlocked && (
          <div className={styles.links}>
            {avatar?.links?.slice(0, MAX_NUMBER_OF_LINKS).map((link, index) => (
              <AvatarLink link={link} key={`profile-link-${index}`} collapsed />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInformation
