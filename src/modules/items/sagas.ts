import { call, put, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { ItemAPI } from '../clients/items'
import { config } from '../config'
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure, FetchItemsRequestAction } from './actions'

export const NFT_SERVER_URL = config.get('NFT_SERVER_URL')

export function* itemSagas() {
  const itemAPI = new ItemAPI(NFT_SERVER_URL)

  yield takeEvery(fetchItemsRequest.type, handleFetchItemsRequest)

  function* handleFetchItemsRequest(action: FetchItemsRequestAction) {
    const wearableIds: string[] = action.payload

    const filters = {
      ids: wearableIds
    }

    try {
      const items: Awaited<ReturnType<ItemAPI['get']>> = yield call([itemAPI, 'get'], filters)

      yield put(fetchItemsSuccess(items))
    } catch (error) {
      yield put(fetchItemsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
