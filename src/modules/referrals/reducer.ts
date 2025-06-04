import { createReducer } from '@reduxjs/toolkit'
import { loadingReducer, LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'
import { fetchReferralsRequest } from './actions'
import { ReferralTier } from './types'

export type ReferralsState = {
  data: {
    referrals: ReferralTier[]
    invitedUsersAccepted: number
    invitedUsersAcceptedViewed: number
  }
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): ReferralsState => ({
  data: {
    referrals: [],
    invitedUsersAccepted: 0,
    invitedUsersAcceptedViewed: 0
  },
  loading: [],
  error: null
})

export const referralsReducer = createReducer<ReferralsState>(buildInitialState(), builder => {
  builder.addCase(fetchReferralsRequest, (state, action) => {
    state.loading = loadingReducer(state.loading, action)
  })
})
