import { ethers } from 'ethers'
import { call, put, race, select, take, takeEvery } from 'redux-saga/effects'
import { Authenticator, AuthIdentity } from '@dcl/crypto'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { getConnectedProvider } from 'decentraland-dapps/dist/lib/eth'
import {
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_SUCCESS,
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  ENABLE_WALLET_FAILURE,
  ENABLE_WALLET_SUCCESS,
  EnableWalletFailureAction,
  EnableWalletSuccessAction,
  enableWalletRequest
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { getAddress, isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Provider } from 'decentraland-dapps/dist/modules/wallet/types'
import { LoginRequestAction, loginFailure, loginRequest, loginSuccess } from './action'
import { getCurrentIdentity } from './selector'

const ONE_MONTH_IN_MINUTES = 31 * 24 * 60

export async function getEth(): Promise<ethers.BrowserProvider> {
  const provider: Provider | null = await getConnectedProvider()

  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }

  return new ethers.BrowserProvider(provider)
}

export function* identitySaga() {
  yield takeEvery(loginRequest.type, handleLogin)
  // yield takeEvery(disconnectWallet.type, handleLogout)

  function* handleLogin(action: LoginRequestAction) {
    const { providerType } = action.payload
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
        const connectWallet: { success: ConnectWalletSuccessAction; failure: ConnectWalletFailureAction } = yield race({
          success: take(CONNECT_WALLET_SUCCESS),
          failure: take(CONNECT_WALLET_FAILURE)
        })

        if (!connectWallet.success) {
          yield put(loginFailure(connectWallet.failure.payload.error))
          return
        }
      }

      let identity: AuthIdentity = yield select(getCurrentIdentity)
      const address: string = yield select(getAddress)
      // Check if we need  to generate a new identity
      if (!identity) {
        const eth: ethers.BrowserProvider = yield call(getEth)
        const account = ethers.Wallet.createRandom()

        const payload = {
          address: account.address.toString(),
          publicKey: ethers.hexlify(account.publicKey),
          privateKey: ethers.hexlify(account.privateKey)
        }

        const signer: Awaited<ReturnType<ethers.BrowserProvider['getSigner']>> = yield call([eth, 'getSigner'])

        identity = yield call([Authenticator, 'initializeAuthChain'], address, payload, ONE_MONTH_IN_MINUTES, message =>
          signer.signMessage(message)
        )
      }

      yield put(loginSuccess({ address, identity }))
    } catch (error) {
      yield put(loginFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
    }
  }
}
