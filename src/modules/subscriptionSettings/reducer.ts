/* eslint-disable @typescript-eslint/naming-convention */
import { createReducer } from '@reduxjs/toolkit'
import { NotificationChannelType, NotificationType, SubscriptionDetails } from '@dcl/schemas'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  putSubscriptionsFailure,
  putSubscriptionsRequest,
  putSubscriptionsSuccess
} from './actions'
export type SubscriptionSettingsState = {
  subscriptionDetails: SubscriptionDetails
  email: string
  loading: LoadingState
  error: string | null
}

const messageTypes = Object.values(NotificationType).reduce((properties, notificationType) => {
  properties[notificationType] = { email: true, in_app: true }
  return properties
}, {} as Record<NotificationType, NotificationChannelType>)

const INITIAL_STATE: SubscriptionSettingsState = {
  subscriptionDetails: {
    ignore_all_email: true,
    ignore_all_in_app: false,
    message_type: messageTypes
  },
  email: '',
  loading: [],
  error: null
}

export const subscriptionSettingsReducer = createReducer<SubscriptionSettingsState>(INITIAL_STATE, builder =>
  builder
    .addCase(getSubscriptionsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(getSubscriptionsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = details
      email && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(getSubscriptionsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(putSubscriptionsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(putSubscriptionsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = details
      email && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(putSubscriptionsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
