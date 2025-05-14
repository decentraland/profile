import { takeEvery, call, put, race, take, select } from 'redux-saga/effects'
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
import { getClient, getFriends, getMutualFriends, initiateSocialClient } from './client'
import { getFriendshipStatus } from './selectors'
import { FriendshipStatus, RequestEvent, SocialClient } from './types'

export function* socialSagas() {
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
      yield call(initiateSocialClient, identity)
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
      const friends: Awaited<ReturnType<typeof getFriends>> = yield call(getFriends)

      yield put(fetchFriendsSuccess(friends))
    } catch (error) {
      yield put(fetchFriendsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleFetchFriendRequests() {
    try {
      const client: SocialClient = yield call(getClient)
      const requestEvents: Awaited<ReturnType<SocialClient['getRequestEvents']>> = yield call([client, 'getRequestEvents'])
      const incoming: RequestEvent[] =
        requestEvents?.incoming?.items.map(event => ({
          address: event.user?.address.toLowerCase() ?? 'Unknown',
          createdAt: event.createdAt,
          message: event.message
        })) ?? []
      const outgoing: RequestEvent[] =
        requestEvents?.outgoing?.items.map(event => ({
          address: event.user?.address.toLowerCase() ?? 'Unknown',
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
      const client: SocialClient = yield call(getClient)
      yield call([client, 'cancelFriendshipRequest'], action.payload.toLowerCase())
      yield put(cancelFriendshipRequestSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(cancelFriendshipRequestFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleFetchMutualFriendsRequests(action: FetchMutualFriendsRequestAction) {
    try {
      const mutuals: string[] = yield call(getMutualFriends, action.payload)
      yield put(fetchMutualFriendsSuccess(mutuals))
    } catch (error) {
      yield put(fetchMutualFriendsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRequestFriendship(action: RequestFriendshipRequestAction) {
    try {
      const client: SocialClient = yield call(getClient)
      const requestEvent: Awaited<ReturnType<typeof client.requestFriendship>> = yield call(
        [client, 'requestFriendship'],
        action.payload.toLowerCase()
      )

      if (!requestEvent) {
        yield put(requestFriendshipFailure('Unknown'))
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
      const client: SocialClient = yield call(getClient)
      yield call([client, 'deleteFriendshipRequest'], action.payload.toLowerCase())
      yield put(removeFriendSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(removeFriendFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleAcceptFriendRequest(action: AcceptFriendshipRequestAction) {
    try {
      const client: SocialClient = yield call(getClient)
      yield call([client, 'acceptFriendshipRequest'], action.payload.toLowerCase())
      yield put(acceptFriendshipSuccess(action.payload.toLowerCase()))
    } catch (error) {
      yield put(acceptFriendshipFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRejectFriendRequest(action: RejectFriendshipRequestAction) {
    try {
      const client: SocialClient = yield call(getClient)
      yield call([client, 'rejectFriendshipRequest'], action.payload.toLowerCase())
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
