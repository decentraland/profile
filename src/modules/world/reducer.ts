import { createReducer } from '@reduxjs/toolkit'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { fetchWorldsFailure, fetchWorldsRequest, fetchWorldsSuccess } from './actions'
import { World } from './types'

export type WorldState = {
  data: World[]
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: WorldState = {
  data: [],
  loading: [],
  error: null
}

export const worldReducer = createReducer<WorldState>(INITIAL_STATE, builder =>
  builder
    .addCase(fetchWorldsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchWorldsSuccess, (state, action) => {
      state.data = action.payload
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchWorldsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
