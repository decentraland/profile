import { Dispatch } from '@reduxjs/toolkit'
import {
  FetchFriendRequestsEventsRequestAction,
  FetchFriendsRequestAction,
  RemoveFriendRequestAction,
  RequestFriendshipRequestAction
} from '../../modules/social/actions'
import { FriendshipStatus } from '../../modules/social/types'

export type Props = {
  onAddFriend: () => void
  onRemoveFriend: () => void
  onAcceptFriendRequest: () => void
  onCancelFriendRequest: () => void
  onFetchFriends: () => void
  friendAddress: string
  isLoading: boolean
  friendshipStatus?: FriendshipStatus
  className?: string
}

export type OwnProps = Pick<Props, 'friendAddress' | 'className'>
export type MapStateProps = Pick<Props, 'isLoading' | 'friendshipStatus'>
export type MapDispatchProps = Pick<
  Props,
  'onFetchFriends' | 'onRemoveFriend' | 'onAcceptFriendRequest' | 'onCancelFriendRequest' | 'onAddFriend'
>
export type MapDispatch = Dispatch<
  FetchFriendsRequestAction | FetchFriendRequestsEventsRequestAction | RequestFriendshipRequestAction | RemoveFriendRequestAction
>
