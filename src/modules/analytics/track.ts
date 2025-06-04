import { PayloadAction } from '@reduxjs/toolkit'
import { EventName, GetPayload } from 'decentraland-dapps/dist/modules/analytics/types'
import { add } from 'decentraland-dapps/dist/modules/analytics/utils'
import {
  AcceptFriendshipSuccessAction,
  CancelFriendshipRequestSuccessAction,
  RejectFriendshipSuccessAction,
  RemoveFriendSuccessAction,
  RequestFriendshipSuccessAction,
  acceptFriendshipSuccess,
  cancelFriendshipRequestSuccess,
  rejectFriendshipSuccess,
  removeFriendSuccess,
  requestFriendshipSuccess
} from '../social/actions'
import { Events } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function track<T extends PayloadAction<any, string>>(
  actionType: string,
  eventName: string | ((action: T) => string),
  getPayload = (action: T) => action.payload
) {
  add(actionType, eventName as EventName, getPayload as GetPayload)
}

track<RequestFriendshipSuccessAction>(requestFriendshipSuccess.type, Events.REQUEST_FRIENDSHIP, ({ payload: { address } }) => ({
  to: address
}))

track<RemoveFriendSuccessAction>(removeFriendSuccess.type, Events.REMOVE_FRIENDSHIP, ({ payload }) => ({
  to: payload
}))

track<AcceptFriendshipSuccessAction>(acceptFriendshipSuccess.type, Events.ACCEPT_FRIENDSHIP_REQUEST, ({ payload }) => ({
  to: payload
}))

track<RejectFriendshipSuccessAction>(rejectFriendshipSuccess.type, Events.REJECT_FRIENDSHIP_REQUEST, ({ payload }) => ({
  to: payload
}))

track<CancelFriendshipRequestSuccessAction>(cancelFriendshipRequestSuccess.type, Events.CANCEL_FRIENDSHIP_REQUEST, ({ payload }) => ({
  to: payload
}))
