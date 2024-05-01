/* eslint-disable @typescript-eslint/naming-convention */
import { createReducer } from '@reduxjs/toolkit'
import { NotificationChannelType, NotificationType, SubscriptionDetails } from '@dcl/schemas'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  getSubscriptionsSettingsFailure,
  getSubscriptionsSettingsRequest,
  getSubscriptionsSettingsSuccess,
  putSubscriptionsSettingsFailure,
  putSubscriptionsSettingsRequest,
  putSubscriptionsSettingsSuccess
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

export const buildInitialState = (): SubscriptionSettingsState => ({
  subscriptionDetails: {
    ignore_all_email: true,
    ignore_all_in_app: false,
    message_type: messageTypes
  },
  email: '',
  loading: [],
  error: null
})

export const subscriptionSettingsReducer = createReducer<SubscriptionSettingsState>(buildInitialState(), builder =>
  builder
    .addCase(getSubscriptionsSettingsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(getSubscriptionsSettingsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = details
      email && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(getSubscriptionsSettingsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(putSubscriptionsSettingsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(putSubscriptionsSettingsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = details
      email && email !== '' && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(putSubscriptionsSettingsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
