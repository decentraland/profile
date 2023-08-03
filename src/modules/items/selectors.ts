import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getData as getProfiles } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../reducer'
import { fetchItemsRequest } from './actions'

const wearablesRegex = /^urn:decentraland:(.+):collections-v2:(.+):(.+)$/

const getState = (state: RootState) => state.items
const getLoading = (state: RootState) => getState(state).loading
export const getItems = (state: RootState) => getState(state).data.items
export const getError = (state: RootState) => getState(state).error
export const isLoadingItems = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchItemsRequest.type))
export const getProfileWearableIds = createSelector([getProfiles, (_state, address) => address], (profiles, address) => {
  const profile = profiles[address]
  if (!profile) return []
  return (profile.avatars[0]?.avatar.wearables
    .map(wearable => {
      const regExResult = wearablesRegex.exec(wearable)
      if (!regExResult || (regExResult && regExResult.length < 4)) {
        return null
      }
      return `${regExResult[2]}-${regExResult[3]}`
    })
    .filter(Boolean) ?? []) as string[]
})
