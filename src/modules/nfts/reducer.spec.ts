import { fetchNFTsFailure, fetchNFTsRequest, fetchNFTsSuccess } from './actions'
import { NFTsState, buildInitialState, nftsReducer } from './reducer'
import { NFTResult } from './types'

let state: NFTsState

beforeEach(() => {
  state = buildInitialState()
})

describe('when reducing the request action to fetch nfts', () => {
  beforeEach(() => {
    state.data.nfts = [{ nft: { id: 'nft-id' }, order: null, rental: null } as NFTResult]
  })

  it('should return a state with the error nulled, the loading state set and the nfts cleared', () => {
    expect(nftsReducer(state, fetchNFTsRequest({}))).toEqual({
      ...state,
      loading: [fetchNFTsRequest({})],
      error: null,
      data: { ...state.data, nfts: [] }
    })
  })
})

describe('when reducing the success action to fetch nfts', () => {
  beforeEach(() => {
    state.loading = [fetchNFTsRequest({})]
  })

  it('should return a state with the nfts set and the loading state cleared', () => {
    const nfts = [{ nft: { id: 'my-nft' }, order: null, rental: null } as NFTResult]
    expect(nftsReducer(state, fetchNFTsSuccess({ nfts, total: 1 }))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        total: 1,
        nfts
      }
    })
  })
})

describe('when reducing the failure action to fetch nfts', () => {
  beforeEach(() => {
    state.loading = [fetchNFTsRequest({})]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(nftsReducer(state, fetchNFTsFailure('anErrorMessage'))).toEqual({
      ...state,
      loading: [],
      error: 'anErrorMessage'
    })
  })
})
