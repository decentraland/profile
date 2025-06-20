import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import { fetchReferralsRequest, fetchReferralsSuccess, fetchReferralsFailure } from './actions'
import { ReferralsClient } from './client'
import { referralsSagas } from './sagas'
import { ReferralProgressResponse } from './types'

describe('referrals sagas', () => {
  let mockApi: ReferralsClient
  let mockReferralData: ReferralProgressResponse

  beforeEach(() => {
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
          .provide([[call([mockApi, 'getReferralProgress']), mockReferralData]])
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
          .provide([[call([mockApi, 'getReferralProgress']), zeroData]])
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
          .provide([[call([mockApi, 'getReferralProgress']), largeData]])
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

    describe('and the API call fails with an error that has a message', () => {
      it('should dispatch failure action with the error message', () => {
        const error = new Error('API Error')

        return expectSaga(referralsSagas, mockApi)
          .provide([[call([mockApi, 'getReferralProgress']), throwError(error)]])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('API Error'))
          .run()
      })
    })

    describe('and the API call fails with an error that has no message', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error()

        return expectSaga(referralsSagas, mockApi)
          .provide([[call([mockApi, 'getReferralProgress']), throwError(error)]])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure(''))
          .run()
      })
    })

    describe('and the API call fails with a non-Error object', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('String error')

        return expectSaga(referralsSagas, mockApi)
          .provide([[call([mockApi, 'getReferralProgress']), throwError(error)]])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('String error'))
          .run()
      })
    })

    describe('and the API call fails with null', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('Null error')

        return expectSaga(referralsSagas, mockApi)
          .provide([[call([mockApi, 'getReferralProgress']), throwError(error)]])
          .dispatch(fetchReferralsRequest())
          .put(fetchReferralsFailure('Null error'))
          .run()
      })
    })

    describe('and the API call fails with undefined', () => {
      it('should dispatch failure action with default error message', () => {
        const error = new Error('Undefined error')

        return expectSaga(referralsSagas, mockApi)
          .provide([[call([mockApi, 'getReferralProgress']), throwError(error)]])
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
          [call([mockApi, 'getReferralProgress']), mockReferralData],
          [call([mockApi, 'getReferralProgress']), mockReferralData]
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
