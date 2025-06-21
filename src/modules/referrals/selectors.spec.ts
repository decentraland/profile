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
  })

  describe('getInvitedUsersAccepted', () => {
    it('should return the invitedUsersAccepted value', () => {
      const result = getInvitedUsersAccepted(mockState)
      expect(result).toBe(5)
    })
  })

  describe('getInvitedUsersAcceptedViewed', () => {
    it('should return the invitedUsersAcceptedViewed value', () => {
      const result = getInvitedUsersAcceptedViewed(mockState)
      expect(result).toBe(3)
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
})
