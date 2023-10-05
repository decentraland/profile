import { createReducer } from '@reduxjs/toolkit'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { fetchNFTsFailure, fetchNFTsRequest, fetchNFTsSuccess } from './actions'
import { NFTResult } from './types'

export type NFTsState = {
  data: {
    nfts: NFTResult[]
    total: number
  }
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): NFTsState => ({
  data: {
    nfts: [],
    total: 0
  },
  loading: [],
  error: null
})

export const nftsReducer = createReducer<NFTsState>(buildInitialState(), builder =>
  builder
    .addCase(fetchNFTsRequest, (state, action) => {
      const { skip } = action.payload
      if (skip === 0 || skip === undefined) {
        state.data.nfts = []
        state.data.total = 0
      }
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchNFTsSuccess, (state, action) => {
      const { nfts, total } = action.payload
      state.data.nfts = [...state.data.nfts, ...nfts]
      state.data.total = total
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchNFTsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
