import { call, put, takeEvery } from 'redux-saga/effects'
import { Subscription } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import {
  SaveSubscriptionsSettingsRequestAction,
  getSubscriptionsSettingsFailure,
  getSubscriptionsSettingsRequest,
  getSubscriptionsSettingsSuccess,
  saveSubscriptionsSettingsFailure,
  saveSubscriptionsSettingsRequest,
  saveSubscriptionsSettingsSuccess
} from './actions'

export function* subscriptionSagas(notificationsAPI: NotificationsAPI) {
  yield takeEvery(getSubscriptionsSettingsRequest.type, handleGetSubscriptionsRequest)
  yield takeEvery(saveSubscriptionsSettingsRequest.type, handlePuttSubscriptionsRequest)

  function* handleGetSubscriptionsRequest() {
    try {
      const subscriptionSettings: Subscription = yield call([notificationsAPI, 'getSubscriptionSettings'])

      yield put(getSubscriptionsSettingsSuccess(subscriptionSettings))
    } catch (error) {
      yield put(getSubscriptionsSettingsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePuttSubscriptionsRequest(action: SaveSubscriptionsSettingsRequestAction) {
    try {
      const subscriptionSettings: Subscription = yield call([notificationsAPI, 'putSubscriptionSettings'], action.payload.details)

      yield put(saveSubscriptionsSettingsSuccess(subscriptionSettings))
    } catch (error) {
      yield put(saveSubscriptionsSettingsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
