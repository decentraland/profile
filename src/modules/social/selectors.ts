import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { acceptFriendshipRequest, fetchFriendRequestsEventsRequest, fetchFriendsRequest, initializeSocialClientRequest } from './actions'
import { FriendshipStatus } from './types'

const getState = (state: RootState) => state.social
const getData = (state: RootState) => getState(state).data
const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

export const getFriends = (state: RootState) => getData(state).friends
export const getIncomingEvents = (state: RootState) => getData(state).events.incoming
export const getOutgoingEvents = (state: RootState) => getData(state).events.outgoing
export const isLoadingFriends = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchFriendsRequest.type))
export const isLoadingFriendRequestEvents = createSelector([getLoading], loadingState =>
  isLoadingType(loadingState, fetchFriendRequestsEventsRequest.type)
)
export const getFriendshipStatus = (state: RootState, address: string) => {
  const isFriend = getData(state).friends.includes(address)
  if (isFriend) {
    return FriendshipStatus.FRIEND
  }

  const hasBeenRequestedFriendship = !!getIncomingEvents(state)[address]
  if (hasBeenRequestedFriendship) {
    return FriendshipStatus.PENDING_RESPONSE
  }

  const hasRequestedFriendship = !!getOutgoingEvents(state)[address]
  if (hasRequestedFriendship) {
    return FriendshipStatus.PENDING_REQUEST
  }

  return FriendshipStatus.NOT_FRIEND
}
export const isInitializingSocialClient = createSelector([getLoading], loadingState =>
  isLoadingType(loadingState, initializeSocialClientRequest.type)
)
export const isSocialClientInitialized = createSelector([getData], data => data.initialized)
export const isAcceptingFriendRequest = createSelector(
  [getLoading, (_state, friendAddress) => friendAddress],
  (loadingState, friendAddress) =>
    loadingState.some(action => action.type === acceptFriendshipRequest.type && action.payload === friendAddress)
)
