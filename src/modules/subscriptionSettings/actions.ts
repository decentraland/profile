import { createAction } from '@reduxjs/toolkit'
import { Subscription } from '@dcl/schemas'

export const getSubscriptionsSettingsRequest = createAction('[Request] Get Subscriptions setting')
export const getSubscriptionsSettingsSuccess = createAction<Subscription>('[Success] Get Subscriptions setting')
export const getSubscriptionsSettingsFailure = createAction<string>('[Failure] Get Subscriptions setting')

export type GetSubscriptionsSettingsRequestAction = ReturnType<typeof getSubscriptionsSettingsRequest>
export type GetSubscriptionsSettingsSuccessAction = ReturnType<typeof getSubscriptionsSettingsSuccess>
export type GetSubscriptionsSettingsFailureAction = ReturnType<typeof getSubscriptionsSettingsFailure>

export const saveSubscriptionsSettingsRequest = createAction<Subscription, string>('[Request] Save Subscriptions setting')
export const saveSubscriptionsSettingsSuccess = createAction<Subscription, string>('[Success] Save Subscriptions setting')
export const saveSubscriptionsSettingsFailure = createAction<string>('[Failure] Save Subscriptions setting')

export type SaveSubscriptionsSettingsRequestAction = ReturnType<typeof saveSubscriptionsSettingsRequest>
export type SaveSubscriptionsSettingsSuccessAction = ReturnType<typeof saveSubscriptionsSettingsSuccess>
export type SaveSubscriptionsSettingsFailureAction = ReturnType<typeof saveSubscriptionsSettingsFailure>
