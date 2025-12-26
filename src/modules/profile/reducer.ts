import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { ProfileReducerAction, profileReducer as defaultProfileReducer } from 'decentraland-dapps/dist/modules/profile/reducer'
import { enhancedFetchProfileFailure, enhancedFetchProfileRequest, enhancedFetchProfileSuccess } from './action'
import { ProfileState } from './types'

export const buildInitialState = (): ProfileState => ({
  data: {},
  loading: [],
  error: null,
  enhancedProfileFetchErrors: {}
})

export const profileReducer = createReducer<ProfileState>(buildInitialState(), builder =>
  builder
    .addCase(enhancedFetchProfileRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      delete state.enhancedProfileFetchErrors[action.payload]
    })
    .addCase(enhancedFetchProfileSuccess, (state, action) => {
      state.data[action.payload.address] = action.payload.profile
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(enhancedFetchProfileFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.enhancedProfileFetchErrors[action.payload.address] = action.payload.error
    })
    .addDefaultCase((state, action: AnyAction) => {
      const defaultState = defaultProfileReducer(state, action as ProfileReducerAction)
      state.data = defaultState.data
      state.loading = defaultState.loading
      state.error = defaultState.error
    })
)
