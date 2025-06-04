import { takeEvery } from 'redux-saga/effects'
import { fetchReferralsRequest } from './actions'

export function* referralsSagas() {
  yield takeEvery(fetchReferralsRequest.type, () => {
    console.log('fetchReferralsRequest')
  })
}
