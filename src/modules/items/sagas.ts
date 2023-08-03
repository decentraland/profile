import { call, put, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { ItemAPI } from '../clients/items'
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure, FetchItemsRequestAction } from './actions'

export function* itemSagas(api: ItemAPI) {
  yield takeEvery(fetchItemsRequest.type, handleFetchItemsRequest)

  function* handleFetchItemsRequest(action: FetchItemsRequestAction) {
    const wearableIds: string[] = action.payload

    const filters = {
      ids: wearableIds
    }

    try {
      const response: Awaited<ReturnType<ItemAPI['get']>> = yield call([api, 'get'], filters)

      yield put(fetchItemsSuccess(response.data))
    } catch (error) {
      yield put(fetchItemsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
