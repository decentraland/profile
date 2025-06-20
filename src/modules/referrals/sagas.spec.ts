import { call, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import { AuthIdentity } from '@dcl/crypto'
import { createTestIdentity } from '../../tests/createTestIdentity'
import { getCurrentIdentity } from '../identity/selector'
import { fetchReferralsRequest, fetchReferralsSuccess, fetchReferralsFailure } from './actions'
import { ReferralsClient } from './client'
import { referralsSagas } from './sagas'
import { ReferralProgressResponse } from './types'

describe('referrals sagas', () => {
  let mockApi: ReferralsClient
  let mockIdentity: AuthIdentity
  let mockReferralData: ReferralProgressResponse

  beforeEach(async () => {
    const testIdentity = await createTestIdentity()
    mockIdentity = testIdentity.authChain

    mockApi = new ReferralsClient('mock-url')
    jest.spyOn(mockApi, 'getReferralProgress').mockImplementation(jest.fn())
    mockReferralData = {
      invitedUsersAccepted: 5,
      invitedUsersAcceptedViewed: 3
    }
  })

  describe('when handling fetchReferralsRequest', () => {
    describe('and the API call is successful', () => {
      it('should call the API and dispatch success action', () => {
        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), mockReferralData]
          ])
          .dispatch(fetchReferralsRequest())
          .put(
            fetchReferralsSuccess({
              invitedUsersAccepted: 5,
              invitedUsersAcceptedViewed: 3
            })
          )
          .run()
      })

      it('should handle zero values correctly', () => {
        const zeroData: ReferralProgressResponse = {
          invitedUsersAccepted: 0,
          invitedUsersAcceptedViewed: 0
        }

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), zeroData]
          ])
          .dispatch(fetchReferralsRequest())
          .put(
            fetchReferralsSuccess({
              invitedUsersAccepted: 0,
              invitedUsersAcceptedViewed: 0
            })
          )
          .run()
      })

      it('should handle large values correctly', () => {
        const largeData: ReferralProgressResponse = {
          invitedUsersAccepted: 999999,
          invitedUsersAcceptedViewed: 888888
        }

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), largeData]
          ])
          .dispatch(fetchReferralsRequest())
          .put(
            fetchReferralsSuccess({
              invitedUsersAccepted: 999999,
              invitedUsersAcceptedViewed: 888888
            })
          )
          .run()
      })
    })

    describe('and there is no identity available', () => {
      it('should dispatch failure action with error message', () => {
        return expectSaga(referralsSagas, mockApi)
          .provide([[select(getCurrentIdentity), null]])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('No identity available'))
          .run()
      })
    })

    describe('and the API call fails with an error that has a message', () => {
      it('should dispatch failure action with the error message', () => {
        const error = new Error('API Error')

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), throwError(error)]
          ])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('API Error'))
          .run()
      })
    })

    describe('and the API call fails with an error that has no message', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error()

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), throwError(error)]
          ])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure(''))
          .run()
      })
    })

    describe('and the API call fails with a non-Error object', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('String error')

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), throwError(error)]
          ])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('String error'))
          .run()
      })
    })

    describe('and the API call fails with null', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('Null error')

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), throwError(error)]
          ])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('Null error'))
          .run()
      })
    })

    describe('and the API call fails with undefined', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('Undefined error')

        return expectSaga(referralsSagas, mockApi)
          .provide([
            [select(getCurrentIdentity), mockIdentity],
            [call([mockApi, 'getReferralProgress'], mockIdentity), throwError(error)]
          ])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('Undefined error'))
          .run()
      })
    })
  })

  describe('when handling multiple requests', () => {
    it('should handle multiple fetchReferralsRequest actions correctly', () => {
      return expectSaga(referralsSagas, mockApi)
        .provide([
          [select(getCurrentIdentity), mockIdentity],
          [call([mockApi, 'getReferralProgress'], mockIdentity), mockReferralData],
          [call([mockApi, 'getReferralProgress'], mockIdentity), mockReferralData]
        ])
        .dispatch(fetchReferralsRequest())
        .put(
          fetchReferralsSuccess({
            invitedUsersAccepted: 5,
            invitedUsersAcceptedViewed: 3
          })
        )
        .dispatch(fetchReferralsRequest())
        .put(
          fetchReferralsSuccess({
            invitedUsersAccepted: 5,
            invitedUsersAcceptedViewed: 3
          })
        )
        .run()
    })
  })
})
