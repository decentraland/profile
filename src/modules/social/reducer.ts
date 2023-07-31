import { createReducer } from '@reduxjs/toolkit'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  requestFriendshipFailure,
  requestFriendshipRequest,
  requestFriendshipSuccess,
  acceptFriendshipFailure,
  acceptFriendshipRequest,
  acceptFriendshipSuccess,
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess,
  initializeSocialClientFailure,
  initializeSocialClientRequest,
  initializeSocialClientSuccess,
  removeFriendRequest,
  removeFriendSuccess,
  removeFriendFailure,
  rejectFriendshipFailure,
  rejectFriendshipRequest,
  rejectFriendshipSuccess
} from './actions'
import { RequestEvent } from './types'

export type SocialState = {
  data: {
    events: {
      incoming: Record<string, RequestEvent>
      outgoing: Record<string, RequestEvent>
    }
    friends: string[]
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
    .addCase(requestFriendshipRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(requestFriendshipSuccess, (state, action) => {
      state.data.events.outgoing[action.payload.address] = action.payload
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(requestFriendshipFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(removeFriendRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(removeFriendSuccess, (state, action) => {
      state.data.friends = state.data.friends.filter(address => address !== action.payload)
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(removeFriendFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(acceptFriendshipRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(acceptFriendshipSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.data.friends.push(action.payload)
      delete state.data.events.incoming[action.payload]
    })
    .addCase(acceptFriendshipFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(rejectFriendshipRequest, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(rejectFriendshipSuccess, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      delete state.data.events.incoming[action.payload]
    })
    .addCase(rejectFriendshipFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
