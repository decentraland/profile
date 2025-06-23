import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchReferralsRequest } from './actions'

export const getData = (state: RootState) => state.referrals.data
export const getLoading = (state: RootState) => state.referrals.loading
export const getError = (state: RootState) => state.referrals.error

export const getInvitedUsersAccepted = (state: RootState) => getData(state).invitedUsersAccepted
export const getInvitedUsersAcceptedViewed = (state: RootState) => getData(state).invitedUsersAcceptedViewed

export const isLoadingReferrals = (state: RootState) => isLoadingType(getLoading(state), fetchReferralsRequest.type)
