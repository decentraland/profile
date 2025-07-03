import { takeEvery, call, put, race, take, select, all } from 'redux-saga/effects'
import { FriendshipRequestResponse } from '@dcl/social-rpc-client/dist/protobuff-types/decentraland/social_service/v2/social_service_v2.gen'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { CLOSE_MODAL, CloseModalAction, openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction } from 'decentraland-dapps/dist/modules/wallet/actions'
import { LoginSuccessAction, loginSuccess } from '../identity/action'
import {
  cancelFriendshipRequestRequest,
  cancelFriendshipRequestFailure,
  cancelFriendshipRequestSuccess,
  FetchMutualFriendsRequestAction,
  RequestFriendshipRequestAction,
  RemoveFriendRequestAction,
  requestFriendshipFailure,
  requestFriendshipRequest,
  requestFriendshipSuccess,
  AcceptFriendshipRequestAction,
  RejectFriendshipRequestAction,
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
  CancelFriendshipRequestRequestAction,
  removeFriendFailure,
  removeFriendRequest,
  removeFriendSuccess,
  rejectFriendshipFailure,
  rejectFriendshipRequest,
  rejectFriendshipSuccess,
  LogInAndRequestFriendshipRequestAction,
  logInAndRequestFriendshipRequest
} from './actions'
import { ProfileSocialClient } from './client'
import { getFriendshipStatus } from './selectors'
import { FriendshipStatus, RequestEvent } from './types'

export function* socialSagas(socialClient: ProfileSocialClient) {
  yield takeEvery(loginSuccess.type, handleStartSocialServiceConnection)
  yield takeEvery(fetchFriendsRequest.type, handleFetchFriends)
  yield takeEvery(fetchFriendRequestsEventsRequest.type, handleFetchFriendRequests)
  yield takeEvery(cancelFriendshipRequestRequest.type, handleCancelFriendshipRequest)
  yield takeEvery(fetchMutualFriendsRequest.type, handleFetchMutualFriendsRequests)
  yield takeEvery(requestFriendshipRequest.type, handleRequestFriendship)
  yield takeEvery(logInAndRequestFriendshipRequest.type, handleLogInAndRequestFriendshipRequest)
  yield takeEvery(removeFriendRequest.type, handleRemoveFriend)
  yield takeEvery(acceptFriendshipRequest.type, handleAcceptFriendRequest)
  yield takeEvery(rejectFriendshipRequest.type, handleRejectFriendRequest)
  yield takeEvery(initializeSocialClientSuccess.type, handleInitializeSocialClientSuccess)

  function* handleStartSocialServiceConnection(action: LoginSuccessAction) {
    try {
      const { identity } = action.payload
      yield put(initializeSocialClientRequest())
      yield call([socialClient, 'connect'], identity)
      yield put(initializeSocialClientSuccess())
    } catch (error) {
      yield put(initializeSocialClientFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleInitializeSocialClientSuccess() {
    yield put(fetchFriendsRequest())
    yield put(fetchFriendRequestsEventsRequest())
  }

  function* handleFetchFriends() {
    try {
      const friends: Awaited<ReturnType<typeof socialClient.getFriends>> = yield call([socialClient, 'getFriends'])

      yield put(fetchFriendsSuccess(friends))
    } catch (error) {
      yield put(fetchFriendsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleFetchFriendRequests() {
    try {
      const [incomingRequests, outgoingRequests] = (yield all([
        call([socialClient, 'getPendingIncomingFriendshipRequests']),
        call([socialClient, 'getPendingOutgoingFriendshipRequests'])
      ])) as [FriendshipRequestResponse[], FriendshipRequestResponse[]]

      const incoming: RequestEvent[] =
        incomingRequests.map(event => ({
          address: event.friend?.address.toLowerCase() ?? 'Unknown',
          createdAt: event.createdAt,
          message: event.message
        })) ?? []
      const outgoing: RequestEvent[] =
        outgoingRequests.map(event => ({
          address: event.friend?.address.toLowerCase() ?? 'Unknown',
          createdAt: event.createdAt,
          message: event.message
        })) ?? []
      yield put(fetchFriendRequestsEventsSuccess({ incoming, outgoing }))
    } catch (error) {
      yield put(fetchFriendRequestsEventsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleCancelFriendshipRequest(action: CancelFriendshipRequestRequestAction) {
    try {
      yield call([socialClient, 'cancelFriendshipRequest'], action.payload.toLowerCase())
      yield put(cancelFriendshipRequestSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(cancelFriendshipRequestFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleFetchMutualFriendsRequests(action: FetchMutualFriendsRequestAction) {
    try {
      const mutuals: string[] = yield call([socialClient, 'getMutualFriends'], action.payload)
      yield put(fetchMutualFriendsSuccess(mutuals))
    } catch (error) {
      yield put(fetchMutualFriendsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRequestFriendship(action: RequestFriendshipRequestAction) {
    try {
      const requestEvent: Awaited<ReturnType<typeof socialClient.requestFriendship>> = yield call(
        [socialClient, 'requestFriendship'],
        action.payload.toLowerCase()
      )

      console.log('requestEvent', requestEvent, action.payload.toLowerCase())

      if (!requestEvent) {
        throw new Error('Unsuccessful request')
      }

      yield put(
        requestFriendshipSuccess({
          address: requestEvent?.friend?.address ?? 'Unknown',
          createdAt: requestEvent?.createdAt ?? 0,
          message: requestEvent?.message
        })
      )
    } catch (error) {
      yield put(requestFriendshipFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRemoveFriend(action: RemoveFriendRequestAction) {
    try {
      yield call([socialClient, 'removeFriendship'], action.payload.toLowerCase())
      yield put(removeFriendSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(removeFriendFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleAcceptFriendRequest(action: AcceptFriendshipRequestAction) {
    try {
      yield call([socialClient, 'acceptFriendshipRequest'], action.payload.toLowerCase())
      yield put(acceptFriendshipSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(acceptFriendshipFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRejectFriendRequest(action: RejectFriendshipRequestAction) {
    try {
      yield call([socialClient, 'rejectFriendshipRequest'], action.payload.toLowerCase())
      yield put(rejectFriendshipSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(rejectFriendshipFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleLogInAndRequestFriendshipRequest(action: LogInAndRequestFriendshipRequestAction) {
    const { friendAddress, onLogIn } = action.payload

    yield put(openModal('LoginModal', { onConnect: onLogIn }))

    const {
      success,
      close
    }: {
      success: ConnectWalletSuccessAction
      close: CloseModalAction
    } = yield race({
      success: take(CONNECT_WALLET_SUCCESS),
      close: take(CLOSE_MODAL)
    })

    if (close || (success && success.payload.wallet.address.toLowerCase() === friendAddress)) {
      return
    }

    const { failureInitializingSocialClient } = yield race({
      initializeSocialClientSuccess: take(initializeSocialClientSuccess.type),
      initializeSocialClientFailure: take(initializeSocialClientFailure.type)
    })

    if (failureInitializingSocialClient) {
      return
    }

    const { failureFetchingFriends } = yield race({
      successFetchingFriends: take(fetchFriendsSuccess.type),
      failureFetchingFriends: take(fetchFriendsFailure.type)
    })

    if (failureFetchingFriends) {
      return
    }

    const friendshipStatus: ReturnType<typeof getFriendshipStatus> = yield select(getFriendshipStatus, friendAddress)

    if (friendshipStatus === FriendshipStatus.NOT_FRIEND) {
      yield put(requestFriendshipRequest(friendAddress))
    }
  }
}
