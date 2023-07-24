import { createAction } from '@reduxjs/toolkit'
import { RequestEvent } from './types'

export const startSocialServiceConnection = createAction<string>('[Request] Start the social social service')

export const fetchFriendsRequest = createAction('[Request] Fetch Friends')
export const fetchFriendsSuccess = createAction<string[]>('[Success] Fetch Friends')
export const fetchFriendsFailure = createAction<string>('[Failure] Fetch Friends')

export const fetchFriendRequestsEventsRequest = createAction('[Request] Fetch Friend Request Events')
export const fetchFriendRequestsEventsSuccess = createAction<{ incoming: RequestEvent[]; outgoing: RequestEvent[] }>(
  '[Success] Fetch Friend Request Events'
)
export const fetchFriendRequestsEventsFailure = createAction<string>('[Failure] Fetch Friend Request Events')
