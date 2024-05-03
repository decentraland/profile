import { call, put, takeEvery } from 'redux-saga/effects'
import { Subscription } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import {
  SaveSubscriptionsRequestAction,
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess
} from './actions'

export function* subscriptionSagas(notificationsAPI: NotificationsAPI) {
  yield takeEvery(getSubscriptionsRequest.type, handleGetSubscriptionsRequest)
  yield takeEvery(saveSubscriptionsRequest.type, handlePutSubscriptionsRequest)

  function* handleGetSubscriptionsRequest() {
    try {
      const subscription: Subscription = yield call([notificationsAPI, 'getSubscription'])

      yield put(getSubscriptionsSuccess(subscription))
    } catch (error) {
      yield put(getSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePutSubscriptionsRequest(action: SaveSubscriptionsRequestAction) {
    try {
      const subscription: Subscription = yield call([notificationsAPI, 'putSubscription'], action.payload)

      yield put(saveSubscriptionsSuccess(subscription.details))
    } catch (error) {
      yield put(saveSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
