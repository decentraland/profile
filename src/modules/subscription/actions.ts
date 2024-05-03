import { createAction } from '@reduxjs/toolkit'
import { Subscription, SubscriptionDetails } from '@dcl/schemas'

export const getSubscriptionsRequest = createAction('[Request] Get Subscriptions')
export const getSubscriptionsSuccess = createAction<Subscription>('[Success] Get Subscriptions')
export const getSubscriptionsFailure = createAction<string>('[Failure] Get Subscriptions')

export type GetSubscriptionsRequestAction = ReturnType<typeof getSubscriptionsRequest>
export type GetSubscriptionsSuccessAction = ReturnType<typeof getSubscriptionsSuccess>
export type GetSubscriptionsFailureAction = ReturnType<typeof getSubscriptionsFailure>

export const saveSubscriptionsRequest = createAction<SubscriptionDetails, string>('[Request] Save Subscriptions')
export const saveSubscriptionsSuccess = createAction<SubscriptionDetails, string>('[Success] Save Subscriptions')
export const saveSubscriptionsFailure = createAction<string>('[Failure] Save Subscriptions')

export type SaveSubscriptionsRequestAction = ReturnType<typeof saveSubscriptionsRequest>
export type SaveSubscriptionsSuccessAction = ReturnType<typeof saveSubscriptionsSuccess>
export type SaveSubscriptionsFailureAction = ReturnType<typeof saveSubscriptionsFailure>
