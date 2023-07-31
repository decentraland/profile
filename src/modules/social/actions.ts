import { createAction } from '@reduxjs/toolkit'
import { RequestEvent } from './types'

// Fetch friends actions

export const fetchFriendsRequest = createAction('[Request] Fetch Friends')
export const fetchFriendsSuccess = createAction<string[]>('[Success] Fetch Friends')
export const fetchFriendsFailure = createAction<string>('[Failure] Fetch Friends')

export type FetchFriendsRequestAction = ReturnType<typeof fetchFriendsRequest>
export type FetchFriendsSuccess = ReturnType<typeof fetchFriendsSuccess>
export type FetchFriendsFailure = ReturnType<typeof fetchFriendsFailure>

// Fetch friend requests events actions

export const fetchFriendRequestsEventsRequest = createAction('[Request] Fetch Friend Request Events')
export const fetchFriendRequestsEventsSuccess = createAction<{ incoming: RequestEvent[]; outgoing: RequestEvent[] }>(
  '[Success] Fetch Friend Request Events'
)
export const fetchFriendRequestsEventsFailure = createAction<string>('[Failure] Fetch Friend Request Events')

export type FetchFriendRequestsEventsRequestAction = ReturnType<typeof fetchFriendRequestsEventsRequest>
export type FetchFriendRequestsEventsSuccessAction = ReturnType<typeof fetchFriendRequestsEventsSuccess>
export type FetchFriendRequestsEventsFailureAction = ReturnType<typeof fetchFriendRequestsEventsFailure>

// Social client initialization actions

export const initializeSocialClientRequest = createAction('[Request] Initialize Social Client')
export const initializeSocialClientSuccess = createAction('[Success] Initialize Social Client')
export const initializeSocialClientFailure = createAction<string>('[Failure] Initialize Social Client')

export type InitializeSocialClientRequestAction = ReturnType<typeof initializeSocialClientRequest>
export type InitializeSocialClientSuccessAction = ReturnType<typeof initializeSocialClientSuccess>
export type InitializeSocialClientFailureAction = ReturnType<typeof initializeSocialClientFailure>

// Request friendship

export const requestFriendshipRequest = createAction<string>('[Request] Request Friendship')
export const requestFriendshipSuccess = createAction<RequestEvent>('[Success] Request Friendship')
export const requestFriendshipFailure = createAction<string>('[Failure] Request Friendship')

export type RequestFriendshipRequestAction = ReturnType<typeof requestFriendshipRequest>
export type RequestFriendshipSuccessAction = ReturnType<typeof requestFriendshipSuccess>
export type RequestFriendshipFailureAction = ReturnType<typeof requestFriendshipFailure>

// Remove friends

export const removeFriendRequest = createAction<string>('[Request] Remove Friend')
export const removeFriendSuccess = createAction<string>('[Success] Remove Friend')
export const removeFriendFailure = createAction<string>('[Failure] Remove Friend')

export type RemoveFriendRequestAction = ReturnType<typeof removeFriendRequest>
export type RemoveFriendSuccessAction = ReturnType<typeof removeFriendSuccess>
export type RemoveFriendFailureAction = ReturnType<typeof removeFriendFailure>

// Accept friend requests

export const acceptFriendshipRequest = createAction<string>('[Request] Accept Friendship')
export const acceptFriendshipSuccess = createAction<string>('[Success] Accept Friendship')
export const acceptFriendshipFailure = createAction<string>('[Failure] Accept Friendship')

export type AcceptFriendshipRequestAction = ReturnType<typeof acceptFriendshipRequest>
export type AcceptFriendshipSuccessAction = ReturnType<typeof acceptFriendshipSuccess>
export type AcceptFriendshipFailureAction = ReturnType<typeof acceptFriendshipFailure>

// Reject friend requests

export const rejectFriendshipRequest = createAction<string>('[Request] Reject Friendship')
export const rejectFriendshipSuccess = createAction<string>('[Success] Reject Friendship')
export const rejectFriendshipFailure = createAction<string>('[Failure] Reject Friendship')

export type RejectFriendshipRequestAction = ReturnType<typeof rejectFriendshipRequest>
export type RejectFriendshipSuccessAction = ReturnType<typeof rejectFriendshipSuccess>
export type RejectFriendshipFailureAction = ReturnType<typeof rejectFriendshipFailure>
