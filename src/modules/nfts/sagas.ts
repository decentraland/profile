import { call, put, takeLatest } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { fetchNFTsFailure, fetchNFTsRequest, fetchNFTsSuccess } from './actions'
import { NFTClient } from './client'

export function* nftSagas(api: NFTClient) {
  yield takeLatest(fetchNFTsRequest.type, handleFetchNftsRequest)

  function* handleFetchNftsRequest(action: ReturnType<typeof fetchNFTsRequest>) {
    try {
      const response: Awaited<ReturnType<NFTClient['get']>> = yield call([api, 'get'], action.payload)
      yield put(fetchNFTsSuccess({ nfts: response.data, total: response.total }))
    } catch (error) {
      yield put(fetchNFTsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
