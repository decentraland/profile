import { createSelector } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchNFTsRequest } from './actions'

const getState = (state: RootState) => state.nfts
const getLoading = (state: RootState) => getState(state).loading
export const getNFTs = (state: RootState) => getState(state).data.nfts
export const getTotalNFTs = (state: RootState) => getState(state).data.total
export const getError = (state: RootState) => getState(state).error
export const isLoading = createSelector([getLoading], loadingState => isLoadingType(loadingState, fetchNFTsRequest.type))
