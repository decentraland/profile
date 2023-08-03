import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchItemsRequest } from './actions'

export const getState = (state: RootState) => state.items
export const getItems = (state: RootState) => getState(state).data.items
export const getError = (state: RootState) => getState(state).error
const getLoading = (state: RootState) => getState(state).loading
export const isLoadingItems = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchItemsRequest.type))
