import { RootState } from '../reducer'
import { fetchNFTsRequest } from './actions'
import { buildInitialState } from './reducer'
import { getError, getNFTs, getTotalNFTs, isLoading } from './selectors'
import { NFTResult } from './types'

let state: RootState

beforeEach(() => {
  state = {
    nfts: buildInitialState()
  } as RootState
})

describe('when getting the error from the state', () => {
  beforeEach(() => {
    state.nfts.error = 'error'
  })

  it('should return the error', () => {
    expect(getError(state)).toBe(state.nfts.error)
  })
})

describe('when getting the nfts from the state', () => {
  beforeEach(() => {
    state.nfts.data.nfts = [{ nft: { id: 'my-nft' }, order: null, rental: null } as NFTResult]
  })

  it('should return the nfts', () => {
    expect(getNFTs(state)).toBe(state.nfts.data.nfts)
  })
})

describe('when getting the total nfts from the state', () => {
  beforeEach(() => {
    state.nfts.data.total = 10
  })

  it('should return the total items', () => {
    expect(getTotalNFTs(state)).toBe(state.nfts.data.total)
  })
})

describe('when getting if the nfts are being loaded', () => {
  describe('and the nfts are not being loaded', () => {
    beforeEach(() => {
      state.nfts.loading = []
    })

    it('should return false', () => {
      expect(isLoading(state)).toBe(false)
    })
  })

  describe('and the nfts are being loaded', () => {
    beforeEach(() => {
      state.nfts.loading = [fetchNFTsRequest({})]
    })

    it('should return true', () => {
      expect(isLoading(state)).toBe(true)
    })
  })
})
