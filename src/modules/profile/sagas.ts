import { all, call, put, takeEvery } from 'redux-saga/effects'
import { EthAddress } from '@dcl/schemas'
import { isErrorWithMessage } from '@dcl/social-rpc-client'
import { PeerAPI } from 'decentraland-dapps/dist/lib/peer'
import { createProfileSaga as createDefaultProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { MarketplaceGraphClient } from '../../lib/MarketplaceGraphClient'
import { isNameValid } from '../../utils/names'
import {
  EnhancedFetchProfileRequestAction,
  enhancedFetchProfileFailure,
  enhancedFetchProfileRequest,
  enhancedFetchProfileSuccess
} from './action'

export function createProfileSaga(marketplaceGraphClient: MarketplaceGraphClient, peerApi: PeerAPI) {
  const defaultProfileSagas = createDefaultProfileSaga({ peerUrl: peerApi.url, getIdentity: () => undefined })
  return function* () {
    yield all([profileSagas(marketplaceGraphClient, peerApi), defaultProfileSagas()])
  }
}

export function* profileSagas(marketplaceGraphClient: MarketplaceGraphClient, peerApi: PeerAPI) {
  yield takeEvery(enhancedFetchProfileRequest.type, handleEnhancedFetchProfileRequest)

  function* handleEnhancedFetchProfileRequest(action: EnhancedFetchProfileRequestAction) {
    let address: string = action.payload
    const isEthereumAddress = EthAddress.validate(action.payload)
    try {
      if (!isEthereumAddress) {
        if (!isNameValid(address)) {
          throw new Error(`Invalid name ${action.payload}`)
        }

        const ownerAddress: string | null = yield call([marketplaceGraphClient, 'fetchENSNameOwner'], action.payload)
        if (!ownerAddress) {
          throw new Error(`No owner found for ${action.payload}`)
        }

        address = ownerAddress
      }
      const profile: Profile | undefined = yield call([peerApi, 'fetchProfile'], address)
      if (!profile) {
        throw new Error(`No profile found for ${action.payload}`)
      }

      if (
        !isEthereumAddress &&
        (!profile.avatars[0]?.hasClaimedName || profile.avatars[0]?.name.toLowerCase() !== action.payload.toLowerCase())
      ) {
        throw new Error(`Profile for ${action.payload} found with a different active name`)
      }

      yield put(enhancedFetchProfileSuccess({ address, profile }))
    } catch (error) {
      yield put(enhancedFetchProfileFailure({ address, error: isErrorWithMessage(error) ? error.message : 'Unknown' }))
    }
  }
}
