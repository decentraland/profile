import { RootState } from '../reducer'

export const getState = (state: RootState) => state.items
export const getItems = (state: RootState) => getState(state).data.items
export const getError = (state: RootState) => getState(state).error
export const getLoading = (state: RootState) => getState(state).loading
