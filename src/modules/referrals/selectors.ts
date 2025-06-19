import { createSelector } from 'reselect'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchReferralsRequest } from './actions'

const getState = (state: RootState) => state.referrals

export const getData = createSelector([getState], state => state.data)
export const getLoading = createSelector([getState], state => state.loading)
export const getError = createSelector([getState], state => state.error)

export const getInvitedUsersAccepted = createSelector([getData], data => data.invitedUsersAccepted)
export const getInvitedUsersAcceptedViewed = createSelector([getData], data => data.invitedUsersAcceptedViewed)

export const isLoadingReferrals = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchReferralsRequest.type))
