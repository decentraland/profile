import { createAction } from '@reduxjs/toolkit'
import { Subscription } from '@dcl/schemas'

export const getSubscriptionsSettingsRequest = createAction('[Request] Get Subscriptions setting')
export const getSubscriptionsSettingsSuccess = createAction<Subscription>('[Success] Get Subscriptions setting')
export const getSubscriptionsSettingsFailure = createAction<string>('[Failure] Get Subscriptions setting')

export type GetSubscriptionsSettingsRequestAction = ReturnType<typeof getSubscriptionsSettingsRequest>
export type GetSubscriptionsSettingsSuccessAction = ReturnType<typeof getSubscriptionsSettingsSuccess>
export type GetSubscriptionsSettingsFailureAction = ReturnType<typeof getSubscriptionsSettingsFailure>

export const putSubscriptionsSettingsRequest = createAction<Subscription, string>('[Request] Save Subscriptions setting')
export const putSubscriptionsSettingsSuccess = createAction<Subscription, string>('[Success] Save Subscriptions setting')
export const putSubscriptionsSettingsFailure = createAction<string>('[Failure] Save Subscriptions setting')

export type PutSubscriptionsSettingsRequestAction = ReturnType<typeof putSubscriptionsSettingsRequest>
export type PutSubscriptionsSettingsSuccessAction = ReturnType<typeof putSubscriptionsSettingsSuccess>
export type PutSubscriptionsSettingsFailureAction = ReturnType<typeof putSubscriptionsSettingsFailure>
