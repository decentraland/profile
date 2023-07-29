import { createReducer } from '@reduxjs/toolkit'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess,
  fetchMutualFriendsFailure,
  fetchMutualFriendsRequest,
  fetchMutualFriendsSuccess,
  initializeSocialClientFailure,
  initializeSocialClientRequest,
  initializeSocialClientSuccess
} from './actions'
import { RequestEvent } from './types'

export type SocialState = {
  data: {
    events: {
      incoming: Record<string, RequestEvent>
      outgoing: Record<string, RequestEvent>
    }
    friends: string[]
    mutuals: string[]
    initialized: boolean
  }
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): SocialState => ({
  data: {
    events: {
      incoming: {},
      outgoing: {}
    },
    friends: [],
    mutuals: [],
    initialized: false
  },
  loading: [],
  error: null
})

export const socialReducer = createReducer<SocialState>(buildInitialState(), builder =>
  builder
    .addCase(fetchFriendsRequest, (state, action) => {
      state.data.friends = []
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchFriendsSuccess, (state, action) => {
      state.data.friends = action.payload
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchFriendsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(fetchFriendRequestsEventsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchFriendRequestsEventsSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.events.incoming = action.payload.incoming.reduce((acc, event) => {
        acc[event.address] = event
        return acc
      }, {} as Record<string, RequestEvent>)
      state.data.events.outgoing = action.payload.outgoing.reduce((acc, event) => {
        acc[event.address] = event
        return acc
      }, {} as Record<string, RequestEvent>)
      state.error = null
    })
    .addCase(fetchFriendRequestsEventsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(initializeSocialClientRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(initializeSocialClientSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.initialized = true
    })
    .addCase(initializeSocialClientFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(fetchMutualFriendsRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.mutuals = []
      state.error = null
    })
    .addCase(fetchMutualFriendsSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.mutuals = action.payload
    })
    .addCase(fetchMutualFriendsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
