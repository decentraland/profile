import { createSelector } from '@reduxjs/toolkit'
import { LOAD_PROFILE_REQUEST } from 'decentraland-dapps/dist/modules/profile/actions'
import { getLoading } from 'decentraland-dapps/dist/modules/profile/selectors'

export const isLoadingProfile = createSelector([getLoading, (_state, address) => address], (loadingState, address) =>
  loadingState.some(action => action.type === LOAD_PROFILE_REQUEST && action.payload.address === address.toLowerCase())
)
