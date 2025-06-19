import { call, put, takeEvery, select } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getCurrentIdentity } from '../identity/selector'
import { fetchReferralsRequest, fetchReferralsSuccess, fetchReferralsFailure } from './actions'
import { ReferralsClient } from './client'
import { ReferralProgressResponse } from './types'

export function* referralsSagas(api: ReferralsClient) {
  yield takeEvery(fetchReferralsRequest.type, handleFetchReferrals)

  function* handleFetchReferrals() {
    try {
      const identity: ReturnType<typeof getCurrentIdentity> = yield select(getCurrentIdentity)
      const address: string = yield select(getAddress)

      if (!identity || !address) {
        throw new Error('No identity or address available')
      }

      const data: ReferralProgressResponse = yield call([api, 'getReferralProgress'], identity)

      yield put(
        fetchReferralsSuccess({
          invitedUsersAccepted: data.invitedUsersAccepted,
          invitedUsersAcceptedViewed: data.invitedUsersAcceptedViewed
        })
      )
    } catch (error) {
      yield put(fetchReferralsFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
    }
  }
}
