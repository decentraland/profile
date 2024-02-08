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
import { config } from '../../modules/config'
import { getAvatarName } from '../../modules/profile/utils'
import { FriendshipStatus } from '../../modules/social/types'
import { DESKTOP_ADDRESS_SIZE, MOBILE_ADDRESS_SIZE } from '../../utils/address'
import ConfirmationModal from '../Modals/ConfirmationModal'
import { Props } from './FriendshipButton.types'
import styles from './FriendshipButton.module.css'

const FriendshipButton = (props: Props) => {
  const {
    friendshipStatus,
    friendAddress,
    className,
    isLoading,
    isLoggedIn,
    onAddFriend,
    onCancelFriendRequest,
    onAcceptFriendRequest,
    onRemoveFriend,
    profile
  } = props

  const [isHovering, setIsHovering] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const isTableAndBelow = useTabletAndBelowMediaQuery()

  const avatarName = !profile
    ? friendAddress.slice(0, isTableAndBelow ? MOBILE_ADDRESS_SIZE : DESKTOP_ADDRESS_SIZE)
    : getAvatarName(profile?.avatars[0]).fullName

  const handleAddFriend = useCallback(() => {
    if (!isLoggedIn) {
      window.location.replace(`${config.get('AUTH_URL')}?redirectTo=${window.location.href}`)
    } else {
      onAddFriend()
    }
  }, [isLoggedIn, onAddFriend])

  const handleButtonClick = useCallback(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        setIsOpenModal(true)
        break
      case FriendshipStatus.NOT_FRIEND:
        return handleAddFriend()
      case FriendshipStatus.PENDING_REQUEST:
        setIsOpenModal(true)
        break
      case FriendshipStatus.PENDING_RESPONSE:
        return onAcceptFriendRequest()
    }
  }, [friendshipStatus, setIsOpenModal, onAcceptFriendRequest, handleAddFriend])

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
  }, [handleCloseModal, onRemoveFriend, onCancelFriendRequest, friendshipStatus])

  const handleOnButtonMouseOver = useCallback(() => {
    if (!isTableAndBelow) {
      setIsHovering(true)
    }
  }, [])

  const handleOnButtonMouseOut = useCallback(() => {
    if (!isTableAndBelow) {
      setIsHovering(false)
    }
  }, [])

  const isInverted =
    friendshipStatus === FriendshipStatus.FRIEND ||
    friendshipStatus === FriendshipStatus.PENDING_REQUEST ||
    friendshipStatus === FriendshipStatus.BLOCKED

  return (
    <>
      <Button
        onClick={handleButtonClick}
        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
        primary={!isInverted}
        disabled={isLoading}
        loading={isLoading}
        inverted={isInverted}
        data-testid="FriendshipButton"
        onMouseOver={handleOnButtonMouseOver}
        onMouseOut={handleOnButtonMouseOut}
        className={classNames(className, styles.button, 'customIconButton')}
      >
        {!isLoading ? <img src={buttonIcon} /> : null} {buttonText}
      </Button>
      {(friendshipStatus === FriendshipStatus.PENDING_REQUEST || friendshipStatus === FriendshipStatus.FRIEND) && (
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
