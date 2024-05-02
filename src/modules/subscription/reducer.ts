import { createReducer } from '@reduxjs/toolkit'
import { NotificationType } from '@dcl/schemas'
import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess
} from './actions'
import { MessageTypeCamelCase, NotificationTypeCamelCase, SubscriptionState } from './types'
import { toCamelCase, transformSubscriptionDetailsToCamelCase } from './utils'

const messageTypes: MessageTypeCamelCase = Object.values(NotificationType).reduce((properties, notificationType) => {
  properties[toCamelCase(notificationType) as keyof NotificationTypeCamelCase] = { email: true, inApp: true }
  return properties
}, {} as MessageTypeCamelCase)

export const buildInitialState = (): SubscriptionState => ({
  subscriptionDetails: {
    ignoreAllEmail: true,
    ignoreAllInApp: false,
    messageType: messageTypes
  },
  email: '',
  loading: [],
  error: null
})

export const subscriptionReducer = createReducer<SubscriptionState>(buildInitialState(), builder =>
  builder
    .addCase(getSubscriptionsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(getSubscriptionsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = transformSubscriptionDetailsToCamelCase(details)
      email && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(getSubscriptionsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(saveSubscriptionsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(saveSubscriptionsSuccess, (state, action) => {
      const { details, email } = action.payload
      state.subscriptionDetails = transformSubscriptionDetailsToCamelCase(details)
      email && email !== '' && (state.email = email)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(saveSubscriptionsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
