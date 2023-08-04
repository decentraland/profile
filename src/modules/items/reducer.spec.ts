import { Item } from '@dcl/schemas'
import { fetchItemsByUrnFailure, fetchItemsByUrnRequest, fetchItemsByUrnSuccess } from './actions'
import { ItemsState, buildInitialState, itemsReducer } from './reducer'

let state: ItemsState

beforeEach(() => {
  state = buildInitialState()
})

describe('when reducing the request action to fetch items', () => {
  beforeEach(() => {
    state.data.items = [{ id: 'anotherId' } as Item]
  })

  it('should return a state with the error nulled, the loading state set and the items cleared', () => {
    expect(itemsReducer(state, fetchItemsByUrnRequest(['anId']))).toEqual({
      ...state,
      loading: [fetchItemsByUrnRequest(['anId'])],
      error: null,
      data: { ...state.data, items: [] }
    })
  })
})

describe('when reducing the success action to fetch items', () => {
  beforeEach(() => {
    state.loading = [fetchItemsByUrnRequest(['anId'])]
  })

  it('should return a state with the items set and the loading state cleared', () => {
    expect(itemsReducer(state, fetchItemsByUrnSuccess([{ id: 'anotherId' } as Item]))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        items: [{ id: 'anotherId' } as Item]
      }
    })
  })
})

describe('when reducing the failure action to fetch items', () => {
  beforeEach(() => {
    state.loading = [fetchItemsByUrnRequest(['anId'])]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(itemsReducer(state, fetchItemsByUrnFailure('anErrorMessage'))).toEqual({
      ...state,
      loading: [],
      error: 'anErrorMessage'
    })
  })
})
