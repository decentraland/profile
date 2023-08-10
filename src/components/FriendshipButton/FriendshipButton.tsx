import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import addUserIcon from '../../assets/icons/AddUser.png'
import blockedUserIcon from '../../assets/icons/BlockUser.png'
import pendingRequestIcon from '../../assets/icons/PendingRequest.png'
import unfriendUserIcon from '../../assets/icons/UnfriendUser.png'
import userIcon from '../../assets/icons/User.png'
import { getAvatarName } from '../../modules/profile/utils'
import { FriendshipStatus } from '../../modules/social/types'
import ConfirmationModal from '../Modals/ConfirmationModal'
import { Props } from './FriendshipButton.types'
import styles from './FriendshipButton.module.css'

const FriendshipButton = (props: Props) => {
  const { friendshipStatus, className, isLoading, onAddFriend, onCancelFriendRequest, onAcceptFriendRequest, onRemoveFriend, profile } =
    props

  const [isHovering, setIsHovering] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()
  const avatarName = getAvatarName(profile?.avatars[0]).name

  const handleButtonClick = useCallback(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        setIsOpenModal(true)
        break
      case FriendshipStatus.NOT_FRIEND:
        return onAddFriend()
      case FriendshipStatus.PENDING_REQUEST:
        setIsOpenModal(true)
        break
      case FriendshipStatus.PENDING_RESPONSE:
        return onAcceptFriendRequest()
    }
  }, [friendshipStatus, isHovering])

  const buttonText = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return isHovering ? t('friendship_button.unfriend') : t('friendship_button.friends')
      case FriendshipStatus.NOT_FRIEND:
        return t('friendship_button.add_friend')
      case FriendshipStatus.PENDING_REQUEST:
        return isHovering ? t('friendship_button.cancel_request') : t('friendship_button.pending')
      case FriendshipStatus.PENDING_RESPONSE:
        return t('friendship_button.accept_request')
      case FriendshipStatus.BLOCKED:
        return t('friendship_button.blocked')
      default:
        return 'Unknown'
    }
  }, [friendshipStatus, isHovering])

  const buttonIcon = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return isHovering ? unfriendUserIcon : userIcon
      case FriendshipStatus.NOT_FRIEND:
        return addUserIcon
      case FriendshipStatus.PENDING_REQUEST:
        return isHovering ? unfriendUserIcon : pendingRequestIcon
      case FriendshipStatus.PENDING_RESPONSE:
        return addUserIcon
      case FriendshipStatus.BLOCKED:
        return blockedUserIcon
      default:
        return ''
    }
  }, [friendshipStatus, isHovering])

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false)
  }, [setIsOpenModal])

  const handleOnConfirm = useCallback(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        onRemoveFriend()
        handleCloseModal()
        break
      case FriendshipStatus.PENDING_REQUEST:
        onCancelFriendRequest()
        handleCloseModal()
        break
    }
  }, [handleCloseModal])

  const handleOnButtonMouseOver = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleOnButtonMouseOut = useCallback(() => {
    setIsHovering(false)
  }, [])

  const isInverted =
    friendshipStatus === FriendshipStatus.FRIEND ||
    friendshipStatus === FriendshipStatus.PENDING_REQUEST ||
    friendshipStatus === FriendshipStatus.BLOCKED

  return (
    <>
      <Button
        onClick={handleButtonClick}
        primary={!isInverted}
        disabled={isLoading}
        loading={isLoading}
        inverted={isInverted}
        data-testid="FriendshipButton"
        onMouseOver={handleOnButtonMouseOver}
        onMouseOut={handleOnButtonMouseOut}
        className={classNames(className, styles.button, 'customIconButton', isTabletAndBelow && styles.mobileButton)}
      >
        {!isLoading ? <img src={buttonIcon} /> : null} {buttonText}
      </Button>
      {friendshipStatus && (
        <ConfirmationModal
          type={friendshipStatus}
          onConfirm={handleOnConfirm}
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          avatarName={avatarName}
        />
      )}
    </>
  )
}

export default FriendshipButton
