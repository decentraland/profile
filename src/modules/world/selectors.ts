import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchWorldsRequest } from './actions'

const getState = (state: RootState) => state.world
const getData = (state: RootState) => getState(state).data
const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

export const getActiveWorlds = createSelector([getData], worlds => worlds.filter(world => world.active))
export const hasAName = (state: RootState) => getData(state).length > 0
export const isLoadingWorlds = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchWorldsRequest.type))
