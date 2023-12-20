import { Dispatch } from '@reduxjs/toolkit'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import {
  CancelFriendshipRequestRequestAction,
  RemoveFriendRequestAction,
  RequestFriendshipRequestAction,
  AcceptFriendshipRequestAction,
  FetchFriendRequestsEventsRequestAction,
  FetchFriendsRequestAction,
  LogInAndRequestFriendshipRequestAction
} from '../../modules/social/actions'
import { FriendshipStatus } from '../../modules/social/types'

export type Props = {
  onAddFriend: () => void
  onRemoveFriend: () => void
  onAcceptFriendRequest: () => void
  onCancelFriendRequest: () => void
  friendAddress: string
  isLoading: boolean
  friendshipStatus?: FriendshipStatus
  className?: string
  profile?: Profile
  isLoggedIn?: boolean
  isAuthDappEnabled?: boolean
}

export type OwnProps = Pick<Props, 'friendAddress' | 'className' | 'isLoggedIn'>
export type MapStateProps = Pick<Props, 'isLoading' | 'friendshipStatus' | 'profile' | 'isAuthDappEnabled'>
export type MapDispatchProps = Pick<Props, 'onRemoveFriend' | 'onAcceptFriendRequest' | 'onCancelFriendRequest' | 'onAddFriend'>
export type MapDispatch = Dispatch<
  | FetchFriendsRequestAction
  | FetchFriendRequestsEventsRequestAction
  | CancelFriendshipRequestRequestAction
  | FetchFriendsRequestAction
  | FetchFriendRequestsEventsRequestAction
  | RequestFriendshipRequestAction
  | RemoveFriendRequestAction
  | AcceptFriendshipRequestAction
  | LogInAndRequestFriendshipRequestAction
>
