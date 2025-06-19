import { AnyAction } from '@reduxjs/toolkit'
import { fetchReferralsRequest, fetchReferralsSuccess, fetchReferralsFailure } from './actions'
import { referralsReducer, buildInitialState, ReferralsState } from './reducer'
import { ReferralProgressResponse } from './types'

describe('referrals reducer', () => {
  let initialState: ReferralsState

  beforeEach(() => {
    initialState = buildInitialState()
  })

  describe('when handling the initial state', () => {
    it('should return the initial state', () => {
      expect(referralsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should have the correct initial values', () => {
      expect(initialState.data).toEqual({
        invitedUsersAccepted: 0,
        invitedUsersAcceptedViewed: 0
      })
      expect(initialState.loading).toEqual([])
      expect(initialState.error).toBeNull()
    })
  })

  describe('when handling fetchReferralsRequest', () => {
    it('should set loading state and clear error', () => {
      const state: ReferralsState = {
        ...initialState,
        error: 'Previous error'
      }

      const action = fetchReferralsRequest()
      const newState = referralsReducer(state, action)

      expect(newState.loading).toContainEqual(action)
      expect(newState.error).toBeNull()
    })
  })

  describe('when handling fetchReferralsSuccess', () => {
    it('should update the data and clear loading state', () => {
      const mockData: ReferralProgressResponse = {
        invitedUsersAccepted: 5,
        invitedUsersAcceptedViewed: 3
      }

      const state: ReferralsState = {
        ...initialState,
        loading: [fetchReferralsRequest() as AnyAction]
      }

      const action = fetchReferralsSuccess(mockData)
      const newState = referralsReducer(state, action)

      expect(newState.data.invitedUsersAccepted).toBe(5)
      expect(newState.data.invitedUsersAcceptedViewed).toBe(3)
      expect(newState.loading).not.toContainEqual(fetchReferralsRequest())
    })

    it('should handle zero values correctly', () => {
      const mockData: ReferralProgressResponse = {
        invitedUsersAccepted: 0,
        invitedUsersAcceptedViewed: 0
      }

      const action = fetchReferralsSuccess(mockData)
      const newState = referralsReducer(initialState, action)

      expect(newState.data.invitedUsersAccepted).toBe(0)
      expect(newState.data.invitedUsersAcceptedViewed).toBe(0)
    })

    it('should handle large values correctly', () => {
      const mockData: ReferralProgressResponse = {
        invitedUsersAccepted: 999999,
        invitedUsersAcceptedViewed: 888888
      }

      const action = fetchReferralsSuccess(mockData)
      const newState = referralsReducer(initialState, action)

      expect(newState.data.invitedUsersAccepted).toBe(999999)
      expect(newState.data.invitedUsersAcceptedViewed).toBe(888888)
    })
  })

  describe('when handling fetchReferralsFailure', () => {
    it('should set error message and clear loading state', () => {
      const errorMessage = 'Failed to fetch referrals'
      const state: ReferralsState = {
        ...initialState,
        loading: [fetchReferralsRequest() as AnyAction]
      }

      const action = fetchReferralsFailure(errorMessage)
      const newState = referralsReducer(state, action)

      expect(newState.error).toBe(errorMessage)
      expect(newState.loading).not.toContainEqual(fetchReferralsRequest())
    })

    it('should handle empty error message', () => {
      const action = fetchReferralsFailure('')
      const newState = referralsReducer(initialState, action)

      expect(newState.error).toBe('')
    })

    it('should handle long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const action = fetchReferralsFailure(longErrorMessage)
      const newState = referralsReducer(initialState, action)

      expect(newState.error).toBe(longErrorMessage)
    })
  })

  describe('when handling multiple actions in sequence', () => {
    it('should handle request -> success flow correctly', () => {
      let state = referralsReducer(initialState, fetchReferralsRequest())

      expect(state.loading).toContainEqual(fetchReferralsRequest())
      expect(state.error).toBeNull()

      const mockData: ReferralProgressResponse = {
        invitedUsersAccepted: 10,
        invitedUsersAcceptedViewed: 7
      }

      state = referralsReducer(state, fetchReferralsSuccess(mockData))

      expect(state.data.invitedUsersAccepted).toBe(10)
      expect(state.data.invitedUsersAcceptedViewed).toBe(7)
      expect(state.loading).not.toContainEqual(fetchReferralsRequest())
      expect(state.error).toBeNull()
    })

    it('should handle request -> failure flow correctly', () => {
      let state = referralsReducer(initialState, fetchReferralsRequest())

      expect(state.loading).toContainEqual(fetchReferralsRequest())
      expect(state.error).toBeNull()

      const errorMessage = 'Network error'
      state = referralsReducer(state, fetchReferralsFailure(errorMessage))

      expect(state.error).toBe(errorMessage)
      expect(state.loading).not.toContainEqual(fetchReferralsRequest())
    })

    it('should handle multiple requests and responses correctly', () => {
      let state = referralsReducer(initialState, fetchReferralsRequest())
      state = referralsReducer(state, fetchReferralsRequest()) // Multiple requests

      expect(state.loading).toContainEqual(fetchReferralsRequest())

      const mockData: ReferralProgressResponse = {
        invitedUsersAccepted: 15,
        invitedUsersAcceptedViewed: 12
      }

      state = referralsReducer(state, fetchReferralsSuccess(mockData))

      expect(state.data.invitedUsersAccepted).toBe(15)
      expect(state.data.invitedUsersAcceptedViewed).toBe(12)
    })
  })

  describe('when handling unknown actions', () => {
    it('should return the current state unchanged', () => {
      const currentState: ReferralsState = {
        data: {
          invitedUsersAccepted: 5,
          invitedUsersAcceptedViewed: 3
        },
        loading: [],
        error: null
      }

      const action: AnyAction = { type: 'UNKNOWN_ACTION' }
      const newState = referralsReducer(currentState, action)

      expect(newState).toEqual(currentState)
    })
  })
})
