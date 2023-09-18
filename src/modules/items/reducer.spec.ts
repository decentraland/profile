import { Item } from '@dcl/schemas'
import {
  fetchCreationsFailure,
  fetchCreationsRequest,
  fetchCreationsSuccess,
  fetchItemsByUrnFailure,
  fetchItemsByUrnRequest,
  fetchItemsByUrnSuccess
} from './actions'
import { ItemsState, buildInitialState, itemsReducer } from './reducer'
import { CreationsFetchOptions } from './types'

let state: ItemsState

beforeEach(() => {
  state = buildInitialState()
})

describe('when reducing the request action to fetch items by urn', () => {
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

describe('when reducing the success action to fetch items by urn', () => {
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

describe('when reducing the failure action to fetch items by urn', () => {
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

describe('when reducing the request action to fetch creations', () => {
  let options: CreationsFetchOptions

  beforeEach(() => {
    state.data.items = [{ id: 'anItemId' } as Item]
    options = { creator: '0x1' }
  })

  describe('and the skip option is not set', () => {
    it('should return a state with the error nulled, the loading state set and the items cleared', () => {
      expect(itemsReducer(state, fetchCreationsRequest(options))).toEqual({
        ...state,
        loading: [fetchCreationsRequest(options)],
        error: null,
        data: { ...state.data, items: [] }
      })
    })
  })

  describe('and the skip option is set to 0', () => {
    beforeEach(() => {
      options = { ...options, skip: 0 }
    })

    it('should return a state with the error nulled, the loading state set and the items cleared', () => {
      expect(itemsReducer(state, fetchCreationsRequest(options))).toEqual({
        ...state,
        loading: [fetchCreationsRequest(options)],
        error: null,
        data: { ...state.data, items: [] }
      })
    })
  })

  describe('and the skip option is set to a number greater than 0', () => {
    beforeEach(() => {
      options = { ...options, skip: 10 }
    })

    it('should return a state with the error nulled and the loading state ', () => {
      expect(itemsReducer(state, fetchCreationsRequest(options))).toEqual({
        ...state,
        loading: [fetchCreationsRequest(options)],
        error: null,
        data: { ...state.data, items: [] }
      })
    })
  })
})

describe('when reducing the success action to fetch creations', () => {
  beforeEach(() => {
    state.data.items = [{ id: 'anItemId' } as Item]
    state.loading = [fetchCreationsRequest({ creator: '0x1' })]
  })

  it('should return a state with the items set and the loading state cleared', () => {
    expect(itemsReducer(state, fetchCreationsSuccess([{ id: 'anotherItemId' } as Item]))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        items: [{ id: 'anItemId' } as Item, { id: 'anotherItemId' } as Item]
      }
    })
  })
})

describe('when reducing the failure action to fetch creations', () => {
  beforeEach(() => {
    state.loading = [fetchCreationsRequest({ creator: '0x1' })]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(itemsReducer(state, fetchCreationsFailure('anErrorMessage'))).toEqual({
      ...state,
      loading: [],
      error: 'anErrorMessage'
    })
  })
})
