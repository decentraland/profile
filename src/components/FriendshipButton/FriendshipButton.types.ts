import { FriendshipStatus } from '../../modules/social/types'

export type MapStateProps = Pick<Props, 'isLoading' | 'friendshipStatus'>

export type Props = {
  onAddFriend: () => void
  onRemoveFriend: () => void
  onAcceptFriendRequest: () => void
  onCancelFriendRequest: () => void
  friendAddress: string
  isLoading: boolean
  friendshipStatus?: FriendshipStatus
  className?: string
}

export type OwnProps = Pick<Props, 'friendAddress' | 'className'>
