import { createAction } from '@reduxjs/toolkit'
import { Subscription } from '@dcl/schemas'

export const getSubscriptionsRequest = createAction<string>('[Request] Get Subscriptions setting')
export const getSubscriptionsSuccess = createAction<Subscription, string>('[Success] Get Subscriptions setting')
export const getSubscriptionsFailure = createAction<string>('[Failure] Get Subscriptions setting')

export type GetSubscriptionsRequestAction = ReturnType<typeof getSubscriptionsRequest>
export type GetSubscriptionsSuccessAction = ReturnType<typeof getSubscriptionsSuccess>
export type GetSubscriptionsFailureAction = ReturnType<typeof getSubscriptionsFailure>

export const putSubscriptionsRequest = createAction<Subscription, string>('[Request] Save Subscriptions setting')
export const putSubscriptionsSuccess = createAction<Subscription, string>('[Success] Save Subscriptions setting')
export const putSubscriptionsFailure = createAction<string>('[Failure] Save Subscriptions setting')

export type PutSubscriptionsRequestAction = ReturnType<typeof putSubscriptionsRequest>
export type PutSubscriptionsSuccessAction = ReturnType<typeof putSubscriptionsSuccess>
export type PutSubscriptionsFailureAction = ReturnType<typeof putSubscriptionsFailure>
