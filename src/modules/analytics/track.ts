import { PayloadAction } from '@reduxjs/toolkit'
import { EventName, GetPayload } from 'decentraland-dapps/dist/modules/analytics/types'
import { add } from 'decentraland-dapps/dist/modules/analytics/utils'
import { RequestFriendshipSuccessAction, requestFriendshipSuccess } from '../social/actions'
import { Events } from './types'

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
