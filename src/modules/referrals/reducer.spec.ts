import { AnyAction } from '@reduxjs/toolkit'
import {
  fetchReferralsRequest,
  fetchReferralsSuccess,
  fetchReferralsFailure,
  setReferralEmailRequest,
  setReferralEmailSuccess,
  setReferralEmailFailure
} from './actions'
import { referralsReducer, buildInitialState, ReferralsState } from './reducer'
import { ReferralProgressResponse } from './types'

describe('referrals reducer', () => {
  let initialState: ReferralsState
  let state: ReferralsState

  beforeEach(() => {
    initialState = buildInitialState()
    state = { ...initialState }
  })

  describe('when handling the initial state', () => {
    it('should return the initial state', () => {
      const result = referralsReducer(undefined, { type: 'unknown' })
      expect(result).toEqual(initialState)
    })
  })

  describe('when handling a fetch referrals request', () => {
    beforeEach(() => {
      state = referralsReducer(initialState, fetchReferralsRequest())
    })

    it('should add the request action to loading state', () => {
      expect(state.loading).toContainEqual(fetchReferralsRequest())
    })

    it('should clear any existing error', () => {
      const stateWithError: ReferralsState = {
        ...initialState,
        error: 'Previous error'
      }

      const result = referralsReducer(stateWithError, fetchReferralsRequest())
      expect(result.error).toBeNull()
    })

    describe('and handling a fetch referrals success', () => {
      let mockData: ReferralProgressResponse

      beforeEach(() => {
        mockData = {
          invitedUsersAccepted: 5,
          invitedUsersAcceptedViewed: 3,
          rewardImages: [
            {
              tier: 5,
              url: 'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:amoy:collections-v2:0x6d8a2b6753f59d909ffa7f38b01327c191e4bf60:0/thumbnail'
            }
          ]
        }
        state = referralsReducer(state, fetchReferralsSuccess(mockData))
      })

      it('should update the data with the response values', () => {
        expect(state.data.invitedUsersAccepted).toBe(5)
        expect(state.data.invitedUsersAcceptedViewed).toBe(3)
        expect(state.data.rewardImages).toEqual(mockData.rewardImages)
      })

      it('should remove the request action from loading state', () => {
        expect(state.loading).not.toContainEqual(fetchReferralsRequest())
      })

      it('should keep error as null', () => {
        expect(state.error).toBeNull()
      })
    })

    describe('and handling a fetch referrals failure', () => {
      let errorMessage: string

      beforeEach(() => {
        errorMessage = 'Failed to fetch referrals'
        state = referralsReducer(state, fetchReferralsFailure(errorMessage))
      })

      it('should set the error message', () => {
        expect(state.error).toBe(errorMessage)
      })

      it('should remove the request action from loading state', () => {
        expect(state.loading).not.toContainEqual(fetchReferralsRequest())
      })
    })
  })

  describe('when handling multiple requests', () => {
    beforeEach(() => {
      state = referralsReducer(initialState, fetchReferralsRequest())
      state = referralsReducer(state, fetchReferralsRequest())
    })

    it('should keep the request action in loading state', () => {
      expect(state.loading).toContainEqual(fetchReferralsRequest())
    })

    describe('and handling a success response', () => {
      let mockData: ReferralProgressResponse

      beforeEach(() => {
        mockData = {
          invitedUsersAccepted: 15,
          invitedUsersAcceptedViewed: 12,
          rewardImages: []
        }
        state = referralsReducer(state, fetchReferralsSuccess(mockData))
      })

      it('should update the data with the response values', () => {
        expect(state.data.invitedUsersAccepted).toBe(15)
        expect(state.data.invitedUsersAcceptedViewed).toBe(12)
      })
    })
  })

  describe('when handling a set referral email request', () => {
    let testEmail: string

    beforeEach(() => {
      testEmail = 'test@example.com'
      state = referralsReducer(initialState, setReferralEmailRequest(testEmail))
    })

    it('should add the request action to loading state', () => {
      expect(state.loading).toContainEqual(setReferralEmailRequest(testEmail))
    })

    it('should clear any existing error', () => {
      const stateWithError: ReferralsState = {
        ...initialState,
        error: 'Previous error'
      }

      const result = referralsReducer(stateWithError, setReferralEmailRequest(testEmail))
      expect(result.error).toBeNull()
    })

    describe('and handling a set referral email success', () => {
      beforeEach(() => {
        state = referralsReducer(state, setReferralEmailSuccess())
      })

      it('should remove the request action from loading state', () => {
        expect(state.loading).not.toContainEqual(setReferralEmailRequest(testEmail))
      })

      it('should keep error as null', () => {
        expect(state.error).toBeNull()
      })
    })

    describe('and handling a set referral email failure', () => {
      let errorMessage: string

      beforeEach(() => {
        errorMessage = 'Failed to set referral email'
        state = referralsReducer(state, setReferralEmailFailure(errorMessage))
      })

      it('should set the error message', () => {
        expect(state.error).toBe(errorMessage)
      })

      it('should remove the request action from loading state', () => {
        expect(state.loading).not.toContainEqual(setReferralEmailRequest(testEmail))
      })
    })
  })

  describe('when handling multiple set referral email requests', () => {
    let testEmail: string

    beforeEach(() => {
      testEmail = 'test@example.com'
      state = referralsReducer(initialState, setReferralEmailRequest(testEmail))
      state = referralsReducer(state, setReferralEmailRequest(testEmail))
    })

    it('should keep the request action in loading state', () => {
      expect(state.loading).toContainEqual(setReferralEmailRequest(testEmail))
    })

    describe('and handling a success response', () => {
      beforeEach(() => {
        state = referralsReducer(state, setReferralEmailSuccess())
      })

      it('should remove the request action from loading state', () => {
        expect(state.loading).toHaveLength(1)
      })
    })
  })

  describe('when handling unknown actions', () => {
    let currentState: ReferralsState

    beforeEach(() => {
      currentState = {
        data: {
          invitedUsersAccepted: 5,
          invitedUsersAcceptedViewed: 3,
          rewardImages: [
            {
              tier: 5,
              url: 'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:amoy:collections-v2:0x6d8a2b6753f59d909ffa7f38b01327c191e4bf60:0/thumbnail'
            }
          ]
        },
        loading: [],
        error: null
      }
    })

    it('should return the current state unchanged', () => {
      const action: AnyAction = { type: 'UNKNOWN_ACTION' }
      const result = referralsReducer(currentState, action)
      expect(result).toEqual(currentState)
    })
  })
})
