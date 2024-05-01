import { createSelector } from '@reduxjs/toolkit'
import { NotificationType } from '@dcl/schemas'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { getSubscriptionsSettingsRequest } from './actions'

const getState = (state: RootState) => state.subscriptionSettings
const getLoading = (state: RootState) => getState(state).loading

export const getEmail = createSelector([getState], state => state.email)
export const hasEmail = createSelector([getEmail], email => email.length > 0)
export const getSubscriptionSettings = createSelector([getState], state => state.subscriptionDetails)
export const getError = createSelector([getState], state => state.error)
export const isIgnoringAllEmail = createSelector([getSubscriptionSettings], subscriptionSettings => subscriptionSettings.ignore_all_email)
export const isIgnoringAllInApp = createSelector([getSubscriptionSettings], subscriptionSettings => subscriptionSettings.ignore_all_in_app)
export const getSubscriptionSettingByNotificationType = createSelector(
  [getSubscriptionSettings],
  subscriptionSettings => (notificationType: NotificationType) => subscriptionSettings.message_type[notificationType]
)
export const isLoadingSubscriptions = createSelector([getLoading], loadingState =>
  isLoadingType(loadingState, getSubscriptionsSettingsRequest.type)
)
