import { all, call, put, takeEvery } from 'redux-saga/effects'
import { Network } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { fetchItemsByUrnRequest, fetchItemsByUrnSuccess, fetchItemsByUrnFailure, FetchItemsByUrnRequestAction } from './actions'
import { ItemAPI } from './client'
import { isEthereumWearable, isMaticWearable } from './utils'

export function* itemSagas(api: ItemAPI) {
  yield takeEvery(fetchItemsByUrnRequest.type, handleFetchItemsRequest)

  function* handleFetchItemsRequest(action: FetchItemsByUrnRequestAction) {
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

      const responses: Awaited<ReturnType<ItemAPI['get']>>[] = yield all(apiCalls)

      yield put(fetchItemsByUrnSuccess(responses.flatMap(response => response.data)))
    } catch (error) {
      yield put(fetchItemsByUrnFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
