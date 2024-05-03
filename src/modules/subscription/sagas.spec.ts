import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { Subscription } from '@dcl/schemas'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import {
  getSubscriptionsSuccess,
  getSubscriptionsRequest,
  getSubscriptionsFailure,
  saveSubscriptionsSuccess,
  saveSubscriptionsRequest,
  saveSubscriptionsFailure
} from './actions'
import { buildInitialState } from './reducer'
import { subscriptionSagas } from './sagas'
import { transformSubscriptionDetailsToSnakeCase } from './utils'

let notificationsAPI: NotificationsAPI
let walletAddress: string
let subscriptionSettings: Subscription
const subscriptionSettingsState = buildInitialState()

beforeEach(() => {
  walletAddress = 'testUser'
  notificationsAPI = new NotificationsAPI({})

  subscriptionSettings = {
    email: subscriptionSettingsState.email,
    details: transformSubscriptionDetailsToSnakeCase(subscriptionSettingsState.subscriptionDetails),
    address: walletAddress
  }
})

describe('when handling the request action to fetch the subscription', () => {
  describe('and the notification API call is successful', () => {
    it('should put a fetch subscription success action with the subscription', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscription']), Promise.resolve(subscriptionSettings)]])
        .put(getSubscriptionsSuccess(subscriptionSettings))
        .dispatch(getSubscriptionsRequest())
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to fetch subscription for ${walletAddress}`
    })

    it('should put a fetch subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscription']), Promise.reject(new Error(errorMessage))]])
        .put(getSubscriptionsFailure(errorMessage))
        .dispatch(getSubscriptionsRequest())
        .silentRun()
    })
  })
})

describe('when handling the request action to save the subscription', () => {
  describe('and the notification API call is successful', () => {
    it('should put a save subscription success action with the subscription', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], subscriptionSettings.details), Promise.resolve(subscriptionSettings)]])
        .put(saveSubscriptionsSuccess(subscriptionSettings.details))
        .dispatch(saveSubscriptionsRequest(subscriptionSettings.details))
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save subscription for ${walletAddress}`
    })

    it('should put a save subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], subscriptionSettings.details), Promise.reject(new Error(errorMessage))]])
        .put(saveSubscriptionsFailure(errorMessage))
        .dispatch(saveSubscriptionsRequest(subscriptionSettings.details))
        .silentRun()
    })
  })
})
