import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { Subscription } from '@dcl/schemas'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import {
  getSubscriptionsSettingsSuccess,
  getSubscriptionsSettingsRequest,
  getSubscriptionsSettingsFailure,
  saveSubscriptionsSettingsSuccess,
  saveSubscriptionsSettingsRequest,
  saveSubscriptionsSettingsFailure
} from './actions'
import { buildInitialState } from './reducer'
import { subscriptionSagas } from './sagas'

let notificationsAPI: NotificationsAPI
let walletAddress: string
let subscriptionSettings: Subscription
const subscriptionSettingsState = buildInitialState()

beforeEach(() => {
  walletAddress = 'testUser'
  notificationsAPI = new NotificationsAPI({})

  subscriptionSettings = {
    email: subscriptionSettingsState.email,
    details: subscriptionSettingsState.subscriptionDetails,
    address: walletAddress
  }
})

describe('when handling the request action to fetch the subscription settings', () => {
  describe('and the notification API call is successful', () => {
    it('should put a fetch subscription settings success action with the subscription settings', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscriptionSettings']), Promise.resolve(subscriptionSettings)]])
        .put(getSubscriptionsSettingsSuccess(subscriptionSettings))
        .dispatch(getSubscriptionsSettingsRequest())
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to fetch subscription settings for ${walletAddress}`
    })

    it('should put a fetch subscription settings failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscriptionSettings']), Promise.reject(new Error(errorMessage))]])
        .put(getSubscriptionsSettingsFailure(errorMessage))
        .dispatch(getSubscriptionsSettingsRequest())
        .silentRun()
    })
  })
})

describe('when handling the request action to save the subscription settings', () => {
  describe('and the notification API call is successful', () => {
    it('should put a save subscription settings success action with the subscription settings', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([
          [call([notificationsAPI, 'putSubscriptionSettings'], subscriptionSettings.details), Promise.resolve(subscriptionSettings)]
        ])
        .put(saveSubscriptionsSettingsSuccess(subscriptionSettings))
        .dispatch(saveSubscriptionsSettingsRequest(subscriptionSettings))
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save subscription settings for ${walletAddress}`
    })

    it('should put a save subscription settings failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([
          [call([notificationsAPI, 'putSubscriptionSettings'], subscriptionSettings.details), Promise.reject(new Error(errorMessage))]
        ])
        .put(saveSubscriptionsSettingsFailure(errorMessage))
        .dispatch(saveSubscriptionsSettingsRequest(subscriptionSettings))
        .silentRun()
    })
  })
})
