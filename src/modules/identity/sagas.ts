import { call, put, race, select, take, takeEvery } from 'redux-saga/effects'
import { AuthIdentity } from '@dcl/crypto'
import { getIdentity, storeIdentity, clearIdentity } from '@dcl/single-sign-on-client'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import {
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  ENABLE_WALLET_FAILURE,
  ENABLE_WALLET_SUCCESS,
  EnableWalletFailureAction,
  EnableWalletSuccessAction,
  CHANGE_ACCOUNT,
  enableWalletRequest,
  DISCONNECT_WALLET
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { LoginRequestAction, loginFailure, loginRequest, loginSuccess, logout } from './action'
import { generateIdentity } from './utils'

export function* identitySaga() {
  yield takeEvery(loginRequest.type, handleLogin)
  yield takeEvery(CHANGE_ACCOUNT, handleConnectWalletSuccessAndChangeAccount)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccessAndChangeAccount)
  yield takeEvery(DISCONNECT_WALLET, handleDisconnectWallet)

  function* handleLogin(action: LoginRequestAction) {
    const providerType = action.payload
    // Check if we need to generate an identity
    try {
      // Check if we need to connect the wallet
      const shouldConnectWallet: boolean = yield select(state => !isConnected(state))
      if (shouldConnectWallet) {
        if (!providerType) {
          throw new Error('Undefined provider type')
        }

        // enable wallet
        yield put(enableWalletRequest(providerType))
        const enableWallet: { success: EnableWalletSuccessAction; failure: EnableWalletFailureAction } = yield race({
          success: take(ENABLE_WALLET_SUCCESS),
          failure: take(ENABLE_WALLET_FAILURE)
        })

        if (!enableWallet.success) {
          yield put(loginFailure(enableWallet.failure.payload.error))
          return
        }

        // connect wallet (a CONNECT_WALLET_REQUEST is dispatched automatically after ENABLE_WALLET_SUCCESS, so we just wait for it to resolve)
        // The loginSuccess will be dispatched by handleConnectWalletSuccessAndChangeAccount function.
        const connectWallet: { success: ConnectWalletSuccessAction; failure: ConnectWalletFailureAction } = yield race({
          success: take(CONNECT_WALLET_SUCCESS),
          failure: take(CONNECT_WALLET_FAILURE)
        })

        if (!connectWallet.success) {
          yield put(loginFailure(connectWallet.failure.payload.error))
          return
        }
      }
    } catch (error) {
      yield put(loginFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
    }
  }

  // Persist the address of the connected wallet.
  // This is a workaround for when the user disconnects as there is no selector that provides the address at that point
  let auxAddress: string | null = null

  function setAuxAddress(address: string | null) {
    auxAddress = address
  }

  function* handleDisconnectWallet() {
    if (auxAddress) {
      yield put(logout(auxAddress))
      yield call(clearIdentity, auxAddress)
    }
  }

  function* handleConnectWalletSuccessAndChangeAccount(action: ConnectWalletSuccessAction | ChangeAccountAction) {
    const { wallet } = action.payload
    const { address } = wallet

    setAuxAddress(address)

    let identity: AuthIdentity

    const ssoIdentity: AuthIdentity | null = yield call(getIdentity, address)

    if (!ssoIdentity) {
      identity = yield call(generateIdentity, address)
      yield call(storeIdentity, address, identity)
    } else {
      identity = ssoIdentity
    }

    yield put(loginSuccess({ address: wallet.address, identity }))
  }
}
