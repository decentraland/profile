import { ethers } from 'ethers'
import { takeEvery, call, select, put } from 'redux-saga/effects'
import { Authenticator, AuthIdentity } from '@dcl/crypto'
import { createSocialClient } from '@dcl/social-rpc-client'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { getConnectedProvider } from 'decentraland-dapps/dist/lib/eth'
import { CONNECT_WALLET_SUCCESS } from 'decentraland-dapps/dist/modules/wallet/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Provider } from 'decentraland-dapps/dist/modules/wallet/types'
import { config } from '../config'
import {
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess
  // startSocialServiceConnection
} from './actions'
import { RequestEvent } from './types'

const SYNAPSE_URL = config.get('SYNAPSE_URL')
const SOCIAL_RPC_URL = config.get('SOCIAL_RPC_URL')
const IDENTITY_EXPIRATION_IN_MINUTES = 7 * 24 * 60
// Social client singleton
let socialClient: Awaited<ReturnType<typeof createSocialClient>>

export async function getEth(): Promise<ethers.BrowserProvider> {
  const provider: Provider | null = await getConnectedProvider()

  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }

  return new ethers.BrowserProvider(provider)
}

const getFriends = async (): Promise<string[]> => {
  const friends: string[] = []
  for await (const users of socialClient.getFriends()) {
    users.forEach(user => friends.push(user.address))
  }
  return friends
}

export function* socialSagas() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleStartSocialServiceConnection)
  yield takeEvery(fetchFriendsRequest.type, handleFetchFriends)
  yield takeEvery(fetchFriendRequestsEventsRequest.type, handleFetchFriendRequests)

  function* handleStartSocialServiceConnection() {
    const eth: ethers.BrowserProvider = yield call(getEth)
    const address: string = yield select(getAddress)
    const account = ethers.Wallet.createRandom()

    const payload = {
      address: account.address.toString(),
      publicKey: ethers.hexlify(account.publicKey),
      privateKey: ethers.hexlify(account.privateKey)
    }

    const signer: Awaited<ReturnType<ethers.BrowserProvider['getSigner']>> = yield call([eth, 'getSigner'])

    const identity: AuthIdentity = yield call(
      [Authenticator, 'initializeAuthChain'],
      address,
      payload,
      IDENTITY_EXPIRATION_IN_MINUTES,
      message => signer.signMessage(message)
    )

    // Set the social client globally
    socialClient = yield call(createSocialClient, SYNAPSE_URL, SOCIAL_RPC_URL, address, identity)
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
      const requestEvents: Awaited<ReturnType<typeof socialClient.getRequestEvents>> = yield call([socialClient, 'getRequestEvents'])
      const incoming: RequestEvent[] =
        requestEvents?.incoming?.items.map(event => ({
          address: event.user?.address ?? 'Unknown',
          createdAt: event.createdAt,
          message: event.message
        })) ?? []
      const outgoing: RequestEvent[] =
        requestEvents?.outgoing?.items.map(event => ({
          address: event.user?.address ?? 'Unknown',
          createdAt: event.createdAt,
          message: event.message
        })) ?? []

      yield put(fetchFriendRequestsEventsSuccess({ incoming, outgoing }))
    } catch (error) {
      yield put(fetchFriendRequestsEventsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
