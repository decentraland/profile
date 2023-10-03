import { call, put, race, select, take } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { AuthIdentity } from '@dcl/crypto'
import { CLOSE_MODAL, CloseModalAction, closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction, connectWalletSuccess } from 'decentraland-dapps/dist/modules/wallet/actions'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { loginSuccess } from '../identity/action'
import {
  cancelFriendshipRequestFailure,
  cancelFriendshipRequestRequest,
  cancelFriendshipRequestSuccess,
  acceptFriendshipFailure,
  acceptFriendshipRequest,
  acceptFriendshipSuccess,
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess,
  fetchMutualFriendsFailure,
  fetchMutualFriendsRequest,
  fetchMutualFriendsSuccess,
  initializeSocialClientFailure,
  initializeSocialClientRequest,
  initializeSocialClientSuccess,
  removeFriendFailure,
  removeFriendRequest,
  removeFriendSuccess,
  requestFriendshipFailure,
  requestFriendshipRequest,
  requestFriendshipSuccess,
  rejectFriendshipFailure,
  rejectFriendshipRequest,
  rejectFriendshipSuccess,
  logInAndRequestFriendshipRequest,
  InitializeSocialClientSuccessAction,
  InitializeSocialClientFailureAction,
  FetchFriendsSuccessAction,
  FetchFriendsFailureAction
} from './actions'
import { getClient, getFriends, getMutualFriends, initiateSocialClient } from './client'
import { socialSagas } from './sagas'
import { getFriendshipStatus } from './selectors'
import { FriendshipStatus, RequestEvent, SocialClient } from './types'

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
          address: '0x1b',
          createdAt: 123456789,
          message: undefined
        }
      ]
      outgoingEvents = [
        {
          address: '0x2b',
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
                    items: [{ user: { address: incomingEvents[0].address.toUpperCase() }, createdAt: incomingEvents[0].createdAt }],
                    total: incomingEvents.length
                  },
                  outgoing: {
                    items: [{ user: { address: outgoingEvents[0].address.toUpperCase() }, createdAt: outgoingEvents[0].createdAt }],
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
          args: [address.toLocaleLowerCase(), identity]
        })
        .put(initializeSocialClientSuccess())
        .dispatch(loginSuccess({ address, identity }))
        .silentRun()
    })
  })
})

describe('when handling the friendship request action', () => {
  describe('and getting the client fails', () => {
    it('should put a reject friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(requestFriendshipFailure('anErrorMessage'))
        .dispatch(requestFriendshipRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the request fails', () => {
    it('should put a request friendship failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve({ requestFriendship: () => Promise.reject(new Error('anErrorMessage')) })]])
        .put(requestFriendshipFailure('anErrorMessage'))
        .dispatch(requestFriendshipRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the request succeeds', () => {
    let resolvedEvent: NonNullable<Awaited<ReturnType<SocialClient['requestFriendship']>>>
    let mockedClient: { requestFriendship: () => Promise<NonNullable<Awaited<ReturnType<SocialClient['requestFriendship']>>>> }
    let requestEvent: RequestEvent

    beforeEach(() => {
      resolvedEvent = {
        request: {
          user: {
            address: 'anAddress'
          },
          createdAt: 123456789
        }
      }
      requestEvent = { address: 'anAddress', createdAt: 123456789, message: undefined }
      mockedClient = { requestFriendship: () => Promise.resolve(resolvedEvent) }
    })

    it('should put a request friendship success action with the address of the new friend', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve(mockedClient)]])
        .call.like({ fn: mockedClient.requestFriendship, args: [requestEvent.address.toLowerCase()] })
        .put(requestFriendshipSuccess(requestEvent))
        .dispatch(requestFriendshipRequest(requestEvent.address))
        .silentRun()
    })
  })
})

describe('when handling the accept friend request action', () => {
  describe('and getting the client fails', () => {
    it('should put an accept friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(acceptFriendshipFailure('anErrorMessage'))
        .dispatch(acceptFriendshipRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the request fails', () => {
    it('should put an accept friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve({ acceptFriendshipRequest: () => Promise.reject(new Error('anErrorMessage')) })]])
        .put(acceptFriendshipFailure('anErrorMessage'))
        .dispatch(acceptFriendshipRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the request succeeds', () => {
    let mockedClient: { acceptFriendshipRequest: () => Promise<void> }
    beforeEach(() => {
      mockedClient = { acceptFriendshipRequest: () => Promise.resolve() }
    })

    it('should put an accept friend request success action with the address of the new friend', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve(mockedClient)]])
        .call.like({ fn: mockedClient.acceptFriendshipRequest, args: ['anAddress'.toLowerCase()] })
        .put(acceptFriendshipSuccess('anAddress'.toLowerCase()))
        .dispatch(acceptFriendshipRequest('anAddress'))
        .silentRun()
    })
  })
})

describe('when handling the remove friend request action', () => {
  describe('and getting the client fails', () => {
    it('should put a remove friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(removeFriendFailure('anErrorMessage'))
        .dispatch(removeFriendRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the removal fails', () => {
    it('should put a remove friend failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve({ removeFriend: () => Promise.reject(new Error('anErrorMessage')) })]])
        .put(removeFriendFailure('anErrorMessage'))
        .dispatch(removeFriendRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the removal succeeds', () => {
    let mockedClient: { removeFriend: () => Promise<void> }

    beforeEach(() => {
      mockedClient = { removeFriend: () => Promise.resolve() }
    })

    it('should put a reject friend success action with the address of the new friend', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve(mockedClient)]])
        .call.like({ fn: mockedClient.removeFriend, args: ['anAddress'.toLowerCase()] })
        .put(removeFriendSuccess('anAddress'.toLowerCase()))
        .dispatch(removeFriendRequest('anAddress'))
        .silentRun()
    })
  })
})

describe('when handling the reject friend request action', () => {
  describe('and getting the client fails', () => {
    it('should put a reject friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(rejectFriendshipFailure('anErrorMessage'))
        .dispatch(rejectFriendshipRequest('anAddress'.toLowerCase()))
        .silentRun()
    })
  })

  describe('and the rejection fails', () => {
    it('should put a reject friend request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve({ rejectFriendshipRequest: () => Promise.reject(new Error('anErrorMessage')) })]])
        .put(rejectFriendshipFailure('anErrorMessage'))
        .dispatch(rejectFriendshipRequest('anAddress'.toLowerCase()))
        .silentRun()
    })
  })

  describe('and the rejection succeeds', () => {
    let mockedClient: { rejectFriendshipRequest: () => Promise<void> }
    beforeEach(() => {
      mockedClient = { rejectFriendshipRequest: () => Promise.resolve() }
    })

    it('should put a reject friend request success action with the address of the new friend', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve(mockedClient)]])
        .call.like({ fn: mockedClient.rejectFriendshipRequest, args: ['anAddress'.toLowerCase()] })
        .put(rejectFriendshipSuccess('anAddress'.toLowerCase()))
        .dispatch(rejectFriendshipRequest('anAddress'))
        .silentRun()
    })
  })
})

describe('when handling the fetch mutual friends action', () => {
  describe('and getting the mutual friends succeeds', () => {
    let mutuals: string[]
    beforeEach(() => {
      mutuals = ['0x1', '0x2']
    })

    it("should put a fetch friends success action with the user's friends", () =>
      expectSaga(socialSagas)
        .provide([[call(getMutualFriends, 'anAddress'), Promise.resolve(mutuals)]])
        .put(fetchMutualFriendsSuccess(mutuals))
        .dispatch(fetchMutualFriendsRequest('anAddress'))
        .silentRun())
  })

  describe('and getting the mutual friends fails', () => {
    it('should put a fetch mutual friends failure action with the error message', () =>
      expectSaga(socialSagas)
        .provide([[call(getMutualFriends, 'anAddress'), Promise.reject(new Error('anErrorMessage'))]])
        .put(fetchMutualFriendsFailure('anErrorMessage'))
        .dispatch(fetchMutualFriendsRequest('anAddress'))
        .silentRun())
  })
})

describe('when handling the cancel friendship request action', () => {
  describe('and getting the client fails', () => {
    it('should put a cancel friendship request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.reject(new Error('anErrorMessage'))]])
        .put(cancelFriendshipRequestFailure('anErrorMessage'))
        .dispatch(cancelFriendshipRequestRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the cancelling fails', () => {
    it('should put a cancel friendship request failure action with the error', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve({ cancelFriendshipRequest: () => Promise.reject(new Error('anErrorMessage')) })]])
        .put(cancelFriendshipRequestFailure('anErrorMessage'))
        .dispatch(cancelFriendshipRequestRequest('anAddress'))
        .silentRun()
    })
  })

  describe('and the cancelling succeeds', () => {
    let mockedClient: { cancelFriendshipRequest: () => Promise<void> }
    beforeEach(() => {
      mockedClient = { cancelFriendshipRequest: () => Promise.resolve() }
    })

    it('should put a cancel friendship request success action with the address of the new friend', () => {
      return expectSaga(socialSagas)
        .provide([[call(getClient), Promise.resolve(mockedClient)]])
        .call.like({ fn: mockedClient.cancelFriendshipRequest, args: ['anAddress'.toLowerCase()] })
        .put(cancelFriendshipRequestSuccess('anAddress'.toLowerCase()))
        .dispatch(cancelFriendshipRequestRequest('anAddress'))
        .silentRun()
    })
  })
})

describe('when handling the log in and request friendship action', () => {
  let connectionModalRaceResult: { success: ConnectWalletSuccessAction } | { close: CloseModalAction }
  let friendAddress: string

  beforeEach(() => {
    friendAddress = '0x0'
  })

  describe('and the log in modal is closed', () => {
    beforeEach(() => {
      connectionModalRaceResult = { close: closeModal('LoginModal') }
    })

    it('should finish the saga without requesting the friendship', () => {
      return expectSaga(socialSagas)
        .provide([
          [
            race({
              success: take(CONNECT_WALLET_SUCCESS),
              close: take(CLOSE_MODAL)
            }),
            connectionModalRaceResult
          ]
        ])
        .not.put(requestFriendshipRequest(friendAddress))
        .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
        .silentRun()
    })
  })

  describe('and the wallet connection succeeds', () => {
    describe('and the friendship requested is for the same logged in user', () => {
      beforeEach(() => {
        connectionModalRaceResult = { success: connectWalletSuccess({ address: friendAddress } as Wallet) }
      })

      it('should finish the saga without requesting the friendship', () => {
        return expectSaga(socialSagas)
          .provide([
            [
              race({
                success: take(CONNECT_WALLET_SUCCESS),
                close: take(CLOSE_MODAL)
              }),
              connectionModalRaceResult
            ]
          ])
          .not.put(requestFriendshipRequest(friendAddress))
          .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
          .silentRun()
      })
    })

    describe('and the friendship requested is for another user', () => {
      let socialClientInitializationRaceResult:
        | { initializeSocialClientSuccess: InitializeSocialClientSuccessAction }
        | { initializeSocialClientFailure: InitializeSocialClientFailureAction }

      beforeEach(() => {
        connectionModalRaceResult = { success: connectWalletSuccess({ address: '0x1' } as Wallet) }
      })

      describe('and the social client failed to be initialized', () => {
        beforeEach(() => {
          socialClientInitializationRaceResult = { initializeSocialClientFailure: initializeSocialClientFailure('anErrorMessage') }
        })

        it('should finish the saga without requesting the friendship', () => {
          return expectSaga(socialSagas)
            .provide([
              [
                race({
                  success: take(CONNECT_WALLET_SUCCESS),
                  close: take(CLOSE_MODAL)
                }),
                connectionModalRaceResult
              ],
              [
                race({
                  initializeSocialClientSuccess: take(initializeSocialClientSuccess.type),
                  initializeSocialClientFailure: take(initializeSocialClientFailure.type)
                }),
                socialClientInitializationRaceResult
              ]
            ])
            .not.put(requestFriendshipRequest(friendAddress))
            .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
            .silentRun()
        })
      })

      describe('and the social client was initialized', () => {
        let fetchFriendsRaceResult:
          | { successFetchingFriends: FetchFriendsSuccessAction }
          | { failureFetchingFriends: FetchFriendsFailureAction }

        beforeEach(() => {
          socialClientInitializationRaceResult = { initializeSocialClientSuccess: initializeSocialClientSuccess() }
        })

        describe('and fetching friends failed', () => {
          beforeEach(() => {
            fetchFriendsRaceResult = { failureFetchingFriends: fetchFriendsFailure('anErrorMessage') }
          })

          it('should finish the saga without requesting the friendship', () => {
            return expectSaga(socialSagas)
              .provide([
                [
                  race({
                    success: take(CONNECT_WALLET_SUCCESS),
                    close: take(CLOSE_MODAL)
                  }),
                  connectionModalRaceResult
                ],
                [
                  race({
                    initializeSocialClientSuccess: take(initializeSocialClientSuccess.type),
                    initializeSocialClientFailure: take(initializeSocialClientFailure.type)
                  }),
                  socialClientInitializationRaceResult
                ],
                [
                  race({
                    successFetchingFriends: take(fetchFriendsSuccess.type),
                    failureFetchingFriends: take(fetchFriendsFailure.type)
                  }),
                  fetchFriendsRaceResult
                ]
              ])
              .not.put(requestFriendshipRequest(friendAddress))
              .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
              .silentRun()
          })
        })

        describe('and fetching friends succeeded', () => {
          let friendshipStatus: FriendshipStatus

          beforeEach(() => {
            fetchFriendsRaceResult = { successFetchingFriends: fetchFriendsSuccess([]) }
          })

          describe('and the logged in user is a friend, has a pending request or is blocked by the requested user', () => {
            beforeEach(() => {
              friendshipStatus = FriendshipStatus.FRIEND
            })

            it('should finish the saga without requesting the friendship', () => {
              return expectSaga(socialSagas)
                .provide([
                  [
                    race({
                      success: take(CONNECT_WALLET_SUCCESS),
                      close: take(CLOSE_MODAL)
                    }),
                    connectionModalRaceResult
                  ],
                  [
                    race({
                      initializeSocialClientSuccess: take(initializeSocialClientSuccess.type),
                      initializeSocialClientFailure: take(initializeSocialClientFailure.type)
                    }),
                    socialClientInitializationRaceResult
                  ],
                  [
                    race({
                      successFetchingFriends: take(fetchFriendsSuccess.type),
                      failureFetchingFriends: take(fetchFriendsFailure.type)
                    }),
                    fetchFriendsRaceResult
                  ],
                  [select(getFriendshipStatus, friendAddress), friendshipStatus]
                ])
                .not.put(requestFriendshipRequest(friendAddress))
                .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
                .silentRun()
            })
          })

          describe('and the logged in user is not a friend of the requested user', () => {
            beforeEach(() => {
              friendshipStatus = FriendshipStatus.NOT_FRIEND
            })

            it('should put the friend request action', () => {
              return expectSaga(socialSagas)
                .provide([
                  [
                    race({
                      success: take(CONNECT_WALLET_SUCCESS),
                      close: take(CLOSE_MODAL)
                    }),
                    connectionModalRaceResult
                  ],
                  [
                    race({
                      initializeSocialClientSuccess: take(initializeSocialClientSuccess.type),
                      initializeSocialClientFailure: take(initializeSocialClientFailure.type)
                    }),
                    socialClientInitializationRaceResult
                  ],
                  [
                    race({
                      successFetchingFriends: take(fetchFriendsSuccess.type),
                      failureFetchingFriends: take(fetchFriendsFailure.type)
                    }),
                    fetchFriendsRaceResult
                  ],
                  [select(getFriendshipStatus, friendAddress), friendshipStatus],
                  [put(requestFriendshipRequest(friendAddress)), undefined]
                ])
                .put(requestFriendshipRequest(friendAddress))
                .dispatch(logInAndRequestFriendshipRequest({ friendAddress, onLogIn: () => undefined }))
                .silentRun()
            })
          })
        })
      })
    })
  })
})
