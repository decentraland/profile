import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { AuthIdentity } from '@dcl/crypto'
import { loginSuccess } from '../identity/action'
import {
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess,
  initializeSocialClientFailure,
  initializeSocialClientRequest,
  initializeSocialClientSuccess
} from './actions'
import { getClient, getFriends, initiateSocialClient } from './client'
import { socialSagas } from './sagas'
import { RequestEvent } from './types'

describe('when handling the fetch friends action', () => {
  describe('and getting the friends succeeds', () => {
    let friends: string[]
    beforeEach(() => {
      friends = ['0x1', '0x2']
    })

    it("should put a fetch friends success action with the user's friends", () =>
      expectSaga(socialSagas)
        .provide([[call(getFriends), friends]])
        .put(fetchFriendsSuccess(friends))
        .dispatch(fetchFriendsRequest())
        .silentRun())
  })

  describe('and getting the friends fails', () => {
    it('should put a fetch friends failure action with the error message', () =>
      expectSaga(socialSagas)
        .provide([[call(getFriends), Promise.reject(new Error('anErrorMessage'))]])
        .put(fetchFriendsFailure('anErrorMessage'))
        .dispatch(fetchFriendsRequest())
        .silentRun())
  })
})

describe('when handling the fetch friends requests action', () => {
  describe('and getting the friends requests succeeds', () => {
    let incomingEvents: RequestEvent[]
    let outgoingEvents: RequestEvent[]

    beforeEach(() => {
      incomingEvents = [
        {
          address: '0x1',
          createdAt: 123456789,
          message: undefined
        }
      ]
      outgoingEvents = [
        {
          address: '0x2',
          createdAt: 123456789,
          message: undefined
        }
      ]
    })

    it('should put a fetch friends requests success action with the user friends requests', () => {
      return expectSaga(socialSagas)
        .provide([
          [
            call(getClient),
            {
              getRequestEvents: () =>
                Promise.resolve({
                  incoming: {
                    items: [{ user: { address: incomingEvents[0].address }, createdAt: incomingEvents[0].createdAt }],
                    total: incomingEvents.length
                  },
                  outgoing: {
                    items: [{ user: { address: outgoingEvents[0].address }, createdAt: outgoingEvents[0].createdAt }],
                    total: outgoingEvents.length
                  }
                })
            }
          ]
        ])
        .put(fetchFriendRequestsEventsSuccess({ incoming: incomingEvents, outgoing: outgoingEvents }))
        .dispatch(fetchFriendRequestsEventsRequest())
        .silentRun()
    })
  })

  describe('and getting the friends requests fails', () => {
    it('should put a fetch friends requests failure action with the error message', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(fetchFriendRequestsEventsFailure('anErrorMessage'))
        .dispatch(fetchFriendRequestsEventsRequest())
        .silentRun()
    })
  })
})

describe('when handing the login success action', () => {
  describe('and initializing the social client fails', () => {
    it('should put the initialize social client request and the failure actions', () => {
      return expectSaga(socialSagas)
        .provide([[matchers.call.fn(initiateSocialClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(initializeSocialClientRequest())
        .put(initializeSocialClientFailure('anErrorMessage'))
        .dispatch(loginSuccess({ address: '0x1', identity: {} as AuthIdentity }))
        .silentRun()
    })
  })

  describe('and initializing the social client succeeds', () => {
    let address: string
    let identity: AuthIdentity

    beforeEach(() => {
      address = '0x1'
      identity = {} as AuthIdentity
    })

    it('should put the initialize social client request and success actions and call the initializer function', () => {
      return expectSaga(socialSagas)
        .provide([[matchers.call.fn(initiateSocialClient), Promise.resolve()]])
        .put(initializeSocialClientRequest())
        .call.like({
          fn: initiateSocialClient,
          args: [address, identity]
        })
        .put(initializeSocialClientSuccess())
        .dispatch(loginSuccess({ address, identity }))
        .silentRun()
    })
  })
})
