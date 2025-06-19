import { AnyAction } from '@reduxjs/toolkit'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { fetchReferralsRequest } from './actions'
import { ReferralsState } from './reducer'
import { getData, getLoading, getError, getInvitedUsersAccepted, getInvitedUsersAcceptedViewed, isLoadingReferrals } from './selectors'

// Mock the loading selector
jest.mock('decentraland-dapps/dist/modules/loading/selectors', () => ({
  isLoadingType: jest.fn()
}))

describe('referrals selectors', () => {
  let mockState: RootState
  let mockReferralsState: ReferralsState

  beforeEach(() => {
    mockReferralsState = {
      data: {
        invitedUsersAccepted: 5,
        invitedUsersAcceptedViewed: 3
      },
      loading: [],
      error: null
    }

    mockState = {
      referrals: mockReferralsState
    } as RootState
  })

  describe('getData', () => {
    it('should return the referrals data', () => {
      const result = getData(mockState)
      expect(result).toEqual({
        invitedUsersAccepted: 5,
        invitedUsersAcceptedViewed: 3
      })
    })

    it('should return the correct data when values are zero', () => {
      const stateWithZeros: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            invitedUsersAccepted: 0,
            invitedUsersAcceptedViewed: 0
          }
        }
      } as RootState

      const result = getData(stateWithZeros)
      expect(result).toEqual({
        invitedUsersAccepted: 0,
        invitedUsersAcceptedViewed: 0
      })
    })

    it('should return the correct data when values are large', () => {
      const stateWithLargeValues: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            invitedUsersAccepted: 999999,
            invitedUsersAcceptedViewed: 888888
          }
        }
      } as RootState

      const result = getData(stateWithLargeValues)
      expect(result).toEqual({
        invitedUsersAccepted: 999999,
        invitedUsersAcceptedViewed: 888888
      })
    })
  })

  describe('getLoading', () => {
    it('should return the loading state', () => {
      const result = getLoading(mockState)
      expect(result).toEqual([])
    })

    it('should return the correct loading state when there are loading actions', () => {
      const stateWithLoading: RootState = {
        referrals: {
          ...mockReferralsState,
          loading: [fetchReferralsRequest() as AnyAction]
        }
      } as RootState

      const result = getLoading(stateWithLoading)
      expect(result).toEqual([fetchReferralsRequest()])
    })

    it('should return the correct loading state with multiple loading actions', () => {
      const stateWithMultipleLoading: RootState = {
        referrals: {
          ...mockReferralsState,
          loading: [fetchReferralsRequest() as AnyAction, { type: 'OTHER_ACTION' } as AnyAction]
        }
      } as RootState

      const result = getLoading(stateWithMultipleLoading)
      expect(result).toEqual([fetchReferralsRequest(), { type: 'OTHER_ACTION' }])
    })
  })

  describe('getError', () => {
    it('should return null when there is no error', () => {
      const result = getError(mockState)
      expect(result).toBeNull()
    })

    it('should return the error message when there is an error', () => {
      const stateWithError: RootState = {
        referrals: {
          ...mockReferralsState,
          error: 'Failed to fetch referrals'
        }
      } as RootState

      const result = getError(stateWithError)
      expect(result).toBe('Failed to fetch referrals')
    })

    it('should return empty string when error is empty string', () => {
      const stateWithEmptyError: RootState = {
        referrals: {
          ...mockReferralsState,
          error: ''
        }
      } as RootState

      const result = getError(stateWithEmptyError)
      expect(result).toBe('')
    })

    it('should return long error messages correctly', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const stateWithLongError: RootState = {
        referrals: {
          ...mockReferralsState,
          error: longErrorMessage
        }
      } as RootState

      const result = getError(stateWithLongError)
      expect(result).toBe(longErrorMessage)
    })
  })

  describe('getInvitedUsersAccepted', () => {
    it('should return the invitedUsersAccepted value', () => {
      const result = getInvitedUsersAccepted(mockState)
      expect(result).toBe(5)
    })

    it('should return zero when invitedUsersAccepted is zero', () => {
      const stateWithZero: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            ...mockReferralsState.data,
            invitedUsersAccepted: 0
          }
        }
      } as RootState

      const result = getInvitedUsersAccepted(stateWithZero)
      expect(result).toBe(0)
    })

    it('should return large values correctly', () => {
      const stateWithLargeValue: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            ...mockReferralsState.data,
            invitedUsersAccepted: 999999
          }
        }
      } as RootState

      const result = getInvitedUsersAccepted(stateWithLargeValue)
      expect(result).toBe(999999)
    })
  })

  describe('getInvitedUsersAcceptedViewed', () => {
    it('should return the invitedUsersAcceptedViewed value', () => {
      const result = getInvitedUsersAcceptedViewed(mockState)
      expect(result).toBe(3)
    })

    it('should return zero when invitedUsersAcceptedViewed is zero', () => {
      const stateWithZero: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            ...mockReferralsState.data,
            invitedUsersAcceptedViewed: 0
          }
        }
      } as RootState

      const result = getInvitedUsersAcceptedViewed(stateWithZero)
      expect(result).toBe(0)
    })

    it('should return large values correctly', () => {
      const stateWithLargeValue: RootState = {
        referrals: {
          ...mockReferralsState,
          data: {
            ...mockReferralsState.data,
            invitedUsersAcceptedViewed: 888888
          }
        }
      } as RootState

      const result = getInvitedUsersAcceptedViewed(stateWithLargeValue)
      expect(result).toBe(888888)
    })
  })

  describe('isLoadingReferrals', () => {
    it('should return true when referrals are loading', () => {
      const mockIsLoadingType = isLoadingType as jest.MockedFunction<typeof isLoadingType>
      mockIsLoadingType.mockReturnValue(true)

      const result = isLoadingReferrals(mockState)
      expect(result).toBe(true)
      expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
    })

    it('should return false when referrals are not loading', () => {
      const mockIsLoadingType = isLoadingType as jest.MockedFunction<typeof isLoadingType>
      mockIsLoadingType.mockReturnValue(false)

      const result = isLoadingReferrals(mockState)
      expect(result).toBe(false)
      expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
    })

    it('should call isLoadingType with the correct loading state', () => {
      const stateWithLoading: RootState = {
        referrals: {
          ...mockReferralsState,
          loading: [fetchReferralsRequest() as AnyAction, { type: 'OTHER_ACTION' } as AnyAction]
        }
      } as RootState

      const mockIsLoadingType = isLoadingType as jest.MockedFunction<typeof isLoadingType>
      mockIsLoadingType.mockReturnValue(true)

      isLoadingReferrals(stateWithLoading)
      expect(mockIsLoadingType).toHaveBeenCalledWith([fetchReferralsRequest(), { type: 'OTHER_ACTION' }], fetchReferralsRequest.type)
    })
  })

  describe('selector memoization', () => {
    it('should memoize getData selector', () => {
      const result1 = getData(mockState)
      const result2 = getData(mockState)

      expect(result1).toBe(result2)
    })

    it('should memoize getInvitedUsersAccepted selector', () => {
      const result1 = getInvitedUsersAccepted(mockState)
      const result2 = getInvitedUsersAccepted(mockState)

      expect(result1).toBe(result2)
    })

    it('should memoize getInvitedUsersAcceptedViewed selector', () => {
      const result1 = getInvitedUsersAcceptedViewed(mockState)
      const result2 = getInvitedUsersAcceptedViewed(mockState)

      expect(result1).toBe(result2)
    })

    it('should memoize isLoadingReferrals selector', () => {
      const mockIsLoadingType = isLoadingType as jest.MockedFunction<typeof isLoadingType>
      mockIsLoadingType.mockReturnValue(true)

      const result1 = isLoadingReferrals(mockState)
      const result2 = isLoadingReferrals(mockState)

      expect(result1).toBe(result2)
    })
  })

  describe('edge cases', () => {
    it('should handle undefined state gracefully', () => {
      const undefinedState = undefined as never

      expect(() => getData(undefinedState as RootState)).toThrow()
      expect(() => getLoading(undefinedState as RootState)).toThrow()
      expect(() => getError(undefinedState as RootState)).toThrow()
      expect(() => getInvitedUsersAccepted(undefinedState as RootState)).toThrow()
      expect(() => getInvitedUsersAcceptedViewed(undefinedState as RootState)).toThrow()
    })

    it('should handle state without referrals property', () => {
      const stateWithoutReferrals = {} as RootState

      expect(() => getData(stateWithoutReferrals)).toThrow()
      expect(() => getLoading(stateWithoutReferrals)).toThrow()
      expect(() => getError(stateWithoutReferrals)).toThrow()
      expect(() => getInvitedUsersAccepted(stateWithoutReferrals)).toThrow()
      expect(() => getInvitedUsersAcceptedViewed(stateWithoutReferrals)).toThrow()
    })

    it('should handle state with null referrals property', () => {
      const stateWithNullReferrals = { referrals: null } as unknown as RootState

      expect(() => getData(stateWithNullReferrals)).toThrow()
      expect(() => getLoading(stateWithNullReferrals)).toThrow()
      expect(() => getError(stateWithNullReferrals)).toThrow()
      expect(() => getInvitedUsersAccepted(stateWithNullReferrals)).toThrow()
      expect(() => getInvitedUsersAcceptedViewed(stateWithNullReferrals)).toThrow()
    })
  })
})
