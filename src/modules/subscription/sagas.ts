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
  yield takeEvery(saveSubscriptionsRequest.type, handlePuttSubscriptionsRequest)

  function* handleGetSubscriptionsRequest() {
    try {
      const subscription: Subscription = yield call([notificationsAPI, 'getSubscription'])

      yield put(getSubscriptionsSuccess(subscription))
    } catch (error) {
      yield put(getSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePuttSubscriptionsRequest(action: SaveSubscriptionsRequestAction) {
    try {
      const subscription: Subscription = yield call([notificationsAPI, 'putSubscription'], action.payload.details)

      yield put(saveSubscriptionsSuccess(subscription))
    } catch (error) {
      yield put(saveSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
