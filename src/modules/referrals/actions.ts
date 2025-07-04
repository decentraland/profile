import { createAction } from '@reduxjs/toolkit'
import { ReferralProgressResponse } from './types'

export const fetchReferralsRequest = createAction('[Request] Fetch Referrals')
export const fetchReferralsSuccess = createAction<ReferralProgressResponse>('[Success] Fetch Referrals')
export const fetchReferralsFailure = createAction<string>('[Failure] Fetch Referrals')

export type FetchReferralsRequestAction = ReturnType<typeof fetchReferralsRequest>
export type FetchReferralsSuccessAction = ReturnType<typeof fetchReferralsSuccess>
export type FetchReferralsFailureAction = ReturnType<typeof fetchReferralsFailure>

export const setReferralEmailRequest = createAction<string>('[Request] Set Referral Email')
export const setReferralEmailSuccess = createAction('[Success] Set Referral Email')
export const setReferralEmailFailure = createAction<string>('[Failure] Set Referral Email')

export type SetReferralEmailRequestAction = ReturnType<typeof setReferralEmailRequest>
export type SetReferralEmailSuccessAction = ReturnType<typeof setReferralEmailSuccess>
export type SetReferralEmailFailureAction = ReturnType<typeof setReferralEmailFailure>
