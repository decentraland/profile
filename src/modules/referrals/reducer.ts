import { createReducer } from '@reduxjs/toolkit'
import { loadingReducer, LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  fetchReferralsRequest,
  fetchReferralsSuccess,
  fetchReferralsFailure,
  setReferralEmailRequest,
  setReferralEmailSuccess,
  setReferralEmailFailure
} from './actions'
import { ReferralProgressResponse } from './types'

export type ReferralsState = {
  data: ReferralProgressResponse
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): ReferralsState => ({
  data: {
    invitedUsersAccepted: 0,
    invitedUsersAcceptedViewed: 0
  },
  loading: [],
  error: null
})

export const referralsReducer = createReducer<ReferralsState>(buildInitialState(), builder => {
  builder
    .addCase(fetchReferralsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchReferralsSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.invitedUsersAccepted = action.payload.invitedUsersAccepted
      state.data.invitedUsersAcceptedViewed = action.payload.invitedUsersAcceptedViewed
    })
    .addCase(fetchReferralsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(setReferralEmailRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(setReferralEmailSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(setReferralEmailFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
})
