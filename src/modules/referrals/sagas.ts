import { call, put, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { fetchReferralsRequest, fetchReferralsSuccess, fetchReferralsFailure } from './actions'
import { ReferralsClient } from './client'
import { ReferralProgressResponse } from './types'

export function* referralsSagas(api: ReferralsClient) {
  yield takeEvery(fetchReferralsRequest.type, handleFetchReferrals)

  function* handleFetchReferrals() {
    try {
      const response: ReferralProgressResponse = yield call([api, 'getReferralProgress'])

      yield put(fetchReferralsSuccess(response))
    } catch (error) {
      yield put(fetchReferralsFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
    }
  }
}
