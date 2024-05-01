/* eslint-disable @typescript-eslint/naming-convention */
import { Subscription } from '@dcl/schemas'
import {
  getSubscriptionsSettingsRequest,
  getSubscriptionsSettingsSuccess,
  getSubscriptionsSettingsFailure,
  saveSubscriptionsSettingsFailure,
  saveSubscriptionsSettingsRequest,
  saveSubscriptionsSettingsSuccess
} from './actions'
import { SubscriptionSettingsState, buildInitialState, subscriptionSettingsReducer } from './reducer'

let state: SubscriptionSettingsState
let initialState: SubscriptionSettingsState
let subscription: Subscription

beforeEach(() => {
  state = buildInitialState()
  subscription = {
    address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
    email: 'email@example.org',
    details: state.subscriptionDetails
  }
})

describe('when reducing the get subscription settings request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionSettingsReducer(initialState, getSubscriptionsSettingsRequest())).toEqual({
      ...state,
      loading: [getSubscriptionsSettingsRequest()],
      error: null
    })
  })
})

describe('when reducing the get subscription settings success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [getSubscriptionsSettingsRequest()],
      subscriptionDetails: { ...subscription.details, ignore_all_in_app: true }
    }
  })

  it('should return a state with the  subscription details set, the email set and the loading state cleared', () => {
    expect(subscriptionSettingsReducer(initialState, getSubscriptionsSettingsSuccess(subscription))).toEqual({
      ...state,
      email: subscription.email,
      subscriptionDetails: subscription.details,
      loading: [],
      error: null
    })
  })
})

describe('when reducing the get subscription settings failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [getSubscriptionsSettingsRequest()] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionSettingsReducer(initialState, getSubscriptionsSettingsFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})

describe('when reducing the update of the subscription settings request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionSettingsReducer(initialState, saveSubscriptionsSettingsRequest(subscription))).toEqual({
      ...state,
      loading: [saveSubscriptionsSettingsRequest(subscription)],
      error: null
    })
  })
})

describe('when reducing the update of the subscription settings success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [saveSubscriptionsSettingsRequest(subscription)],
      subscriptionDetails: { ...subscription.details, ignore_all_in_app: true }
    }
  })

  it('should return a state with the details of subscription set, email set and the loading state cleared', () => {
    expect(subscriptionSettingsReducer(initialState, saveSubscriptionsSettingsSuccess(subscription))).toEqual({
      ...state,
      email: subscription.email,
      subscriptionDetails: subscription.details,
      loading: [],
      error: null
    })
  })
})

describe('when reducing update of the subscription settings failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [saveSubscriptionsSettingsRequest(subscription)] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionSettingsReducer(initialState, saveSubscriptionsSettingsFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})
