import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { fetchNFTsRequest, fetchNFTsFailure, fetchNFTsSuccess } from './actions'
import { NFTClient } from './client'
import { nftSagas } from './sagas'
import { NFTResult } from './types'

describe('when handling the fetch of nfts', () => {
  let api: NFTClient

  beforeEach(() => {
    api = new NFTClient('https://example.com')
  })

  describe('and the request to the server fails', () => {
    it('should put the fetch nfts failure action with the error', () => {
      return expectSaga(nftSagas, api)
        .provide([[call([api, 'get'], {}), Promise.reject(new Error('anError'))]])
        .put(fetchNFTsFailure('anError'))
        .dispatch(fetchNFTsRequest({}))
        .silentRun()
    })
  })

  describe('and the request to the server is successful', () => {
    let nfts: NFTResult[]

    beforeEach(() => {
      nfts = [{ nft: { id: 'my-nft' }, order: null, rental: null } as NFTResult]
    })

    it('should put the fetch nfts success action with the nfts', () => {
      return expectSaga(nftSagas, api)
        .provide([[call([api, 'get'], {}), Promise.resolve({ data: nfts, total: 1 })]])
        .put(fetchNFTsSuccess({ nfts, total: 1 }))
        .dispatch(fetchNFTsRequest({}))
        .silentRun()
    })
  })
})
