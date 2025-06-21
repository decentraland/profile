import { createAction } from '@reduxjs/toolkit'
import { ReferralProgressResponse } from './types'

export const fetchReferralsRequest = createAction('[Request] Fetch Referrals')
export const fetchReferralsSuccess = createAction<ReferralProgressResponse>('[Success] Fetch Referrals')
export const fetchReferralsFailure = createAction<string>('[Failure] Fetch Referrals')

export type FetchReferralsRequestAction = ReturnType<typeof fetchReferralsRequest>
export type FetchReferralsSuccessAction = ReturnType<typeof fetchReferralsSuccess>
export type FetchReferralsFailureAction = ReturnType<typeof fetchReferralsFailure>
