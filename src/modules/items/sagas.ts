import { all, call, put, takeEvery } from 'redux-saga/effects'
import { Network } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import {
  fetchItemsByUrnRequest,
  fetchItemsByUrnSuccess,
  fetchItemsByUrnFailure,
  FetchItemsByUrnRequestAction,
  fetchCreationsRequest,
  fetchCreationsFailure,
  fetchCreationsSuccess
} from './actions'
import { ItemsClient } from './client'
import { isEthereumWearable, isMaticWearable } from './utils'

export function* itemSagas(api: ItemsClient) {
  yield takeEvery(fetchItemsByUrnRequest.type, handleFetchItemsByUrnRequest)
  yield takeEvery(fetchCreationsRequest.type, handleFetchCreationsRequest)

  function* handleFetchItemsByUrnRequest(action: FetchItemsByUrnRequestAction) {
    try {
      const urns: string[] = action.payload
      const ethereumUrns = urns.filter(isEthereumWearable)
      const maticUrns = urns.filter(isMaticWearable)

      const apiCalls = []
      if (ethereumUrns.length > 0) {
        apiCalls.push(call([api, 'get'], { urns: ethereumUrns, network: Network.ETHEREUM }))
      }
      if (maticUrns.length > 0) {
        apiCalls.push(call([api, 'get'], { urns: maticUrns, network: Network.MATIC }))
      }

      const responses: Awaited<ReturnType<ItemsClient['get']>>[] = yield all(apiCalls)

      yield put(fetchItemsByUrnSuccess(responses.flatMap(response => response.data)))
    } catch (error) {
      yield put(fetchItemsByUrnFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleFetchCreationsRequest(action: ReturnType<typeof fetchCreationsRequest>) {
    try {
      const response: Awaited<ReturnType<ItemsClient['get']>> = yield call([api, 'get'], action.payload)
      yield put(fetchCreationsSuccess({ items: response.data, total: response.total }))
    } catch (error) {
      yield put(fetchCreationsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
