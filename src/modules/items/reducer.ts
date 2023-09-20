import { createReducer } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  fetchItemsByUrnRequest,
  fetchItemsByUrnSuccess,
  fetchItemsByUrnFailure,
  fetchCreationsRequest,
  fetchCreationsSuccess,
  fetchCreationsFailure
} from './actions'

export type ItemsState = {
  data: {
    items: Item[]
    total: number
  }
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): ItemsState => ({
  data: {
    items: [],
    total: 0
  },
  loading: [],
  error: null
})

export const itemsReducer = createReducer<ItemsState>(buildInitialState(), builder =>
  builder
    .addCase(fetchItemsByUrnRequest, (state, action) => {
      state.data.items = []
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchItemsByUrnSuccess, (state, action) => {
      state.data.items = action.payload
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchItemsByUrnFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
    .addCase(fetchCreationsRequest, (state, action) => {
      const { skip } = action.payload
      if (skip === 0 || skip === undefined) {
        state.data.items = []
        state.data.total = 0
      }
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchCreationsSuccess, (state, action) => {
      const { items, total } = action.payload
      state.data.items = [...state.data.items, ...items]
      state.data.total = total
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchCreationsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
