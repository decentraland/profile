import { createReducer } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { LoadingState, loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure } from './actions'

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
    .addCase(fetchItemsRequest, (state, action) => {
      state.data.items = []
      state.loading = loadingReducer(state.loading, action)
      state.error = null
    })
    .addCase(fetchItemsSuccess, (state, action) => {
      state.data.items = action.payload
      state.loading = loadingReducer(state.loading, action)
    })
    .addCase(fetchItemsFailure, (state, action) => {
      state.loading = loadingReducer(state.loading, action)
      state.error = action.payload
    })
)
