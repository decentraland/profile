import { createReducer } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { fetchItemsByUrnRequest, fetchItemsByUrnSuccess, fetchItemsByUrnFailure } from './actions'

export type ItemsState = {
  data: {
    items: Item[]
  }
  loading: LoadingState
  error: string | null
}

export const buildInitialState = (): ItemsState => ({
  data: {
    items: []
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
)
