import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import addUserIcon from '../../assets/icons/AddUser.png'
import blockedUserIcon from '../../assets/icons/BlockUser.png'
import pendingRequestIcon from '../../assets/icons/PendingRequest.png'
import unfriendUserIcon from '../../assets/icons/UnfriendUser.png'
import userIcon from '../../assets/icons/User.png'
import { FriendshipStatus } from '../../modules/social/types'
import { Props } from './FriendshipButton.types'

const FriendshipButton = (props: Props) => {
  const { friendshipStatus, className, onAddFriend, onCancelFriendRequest, onAcceptFriendRequest, onRemoveFriend } = props

  const [isHovering, setIsHovering] = useState(false)

  const handleButtonClick = useCallback(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return onRemoveFriend()
      case FriendshipStatus.NOT_FRIEND:
        return onAddFriend()
      case FriendshipStatus.PENDING_REQUEST:
        return onCancelFriendRequest()
      case FriendshipStatus.PENDING_RESPONSE:
        return onAcceptFriendRequest()
    }
  }, [friendshipStatus])

  const buttonText = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return isHovering ? t('friendship_button.unfriend') : t('friendship_button.friends')
      case FriendshipStatus.NOT_FRIEND:
        return t('friendship_button.add_friend')
      case FriendshipStatus.PENDING_REQUEST:
        return isHovering ? t('friendship_button.pending') : t('friendship_button.cancel_request')
      case FriendshipStatus.PENDING_RESPONSE:
        return t('friendship_button.accept_request')
      case FriendshipStatus.BLOCKED:
        return t('friendship_button.blocked')
      default:
        return 'Unknown'
    }
  }, [friendshipStatus])

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
  }, [friendshipStatus])

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
    <Button
      onClick={handleButtonClick}
      primary
      inverted={isInverted}
      onMouseOver={handleOnButtonMouseOver}
      onMouseOut={handleOnButtonMouseOut}
      className={classNames(className)}
    >
      <img src={buttonIcon} /> {buttonText}
    </Button>
  )
}

export default FriendshipButton
