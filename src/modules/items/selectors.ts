import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getData as getProfiles } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../reducer'
import { fetchCreationsRequest, fetchItemsByUrnRequest, fetchReferralsRequest } from './actions'
import { removeIdFromWearableUrn } from './utils'

const getState = (state: RootState) => state.items
const getLoading = (state: RootState) => getState(state).loading
export const getItems = (state: RootState) => getState(state).data.items
export const getTotalItems = (state: RootState) => getState(state).data.total
export const getError = (state: RootState) => getState(state).error
export const isLoadingItems = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchItemsByUrnRequest.type))
export const isLoadingCreations = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchCreationsRequest.type))
export const isLoadingReferrals = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchReferralsRequest.type))
export const getProfileWearableUrns = createSelector(
  [getProfiles, (_state, address) => address],
  (profiles, address) => profiles[address]?.avatars[0]?.avatar.wearables.map((urn: string) => removeIdFromWearableUrn(urn)) ?? []
)
