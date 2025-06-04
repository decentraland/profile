import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchReferralsRequest } from './actions'

const getState = (state: RootState) => state.referrals
const getLoading = (state: RootState) => getState(state).loading
export const isLoadingReferrals = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchReferralsRequest.type))

export const getReferrals = createSelector([getState], state => state.data)
export const getReferralsError = createSelector([getState], state => state.error)
