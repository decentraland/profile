import { takeEvery, call, put } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
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
  rejectFriendshipSuccess
} from './actions'
import { getClient, getFriends, getMutualFriends, initiateSocialClient } from './client'
import { RequestEvent, SocialClient } from './types'

export function* socialSagas() {
  yield takeEvery(loginSuccess.type, handleStartSocialServiceConnection)
  yield takeEvery(fetchFriendsRequest.type, handleFetchFriends)
  yield takeEvery(fetchFriendRequestsEventsRequest.type, handleFetchFriendRequests)
  yield takeEvery(cancelFriendshipRequestRequest.type, handleCancelFriendshipRequest)
  yield takeEvery(fetchMutualFriendsRequest.type, handleFetchMutualFriendsRequests)
  yield takeEvery(requestFriendshipRequest.type, handleRequestFriendship)
  yield takeEvery(removeFriendRequest.type, handleRemoveFriend)
  yield takeEvery(acceptFriendshipRequest.type, handleAcceptFriendRequest)
  yield takeEvery(rejectFriendshipRequest.type, handleRejectFriendRequest)
  yield takeEvery(initializeSocialClientSuccess.type, handleInitializeSocialClientSuccess)

  function* handleStartSocialServiceConnection(action: LoginSuccessAction) {
    try {
      const { address, identity } = action.payload
      yield put(initializeSocialClientRequest())
      yield call(initiateSocialClient, address, identity)
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
      yield put(
        requestFriendshipSuccess({
          address: requestEvent?.request?.user?.address ?? 'Unknown',
          createdAt: requestEvent?.request?.createdAt ?? 0,
          message: requestEvent?.request?.message
        })
      )
    } catch (error) {
      yield put(requestFriendshipFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleRemoveFriend(action: RemoveFriendRequestAction) {
    try {
      const client: SocialClient = yield call(getClient)
      yield call([client, 'removeFriend'], action.payload.toLowerCase())
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
}
