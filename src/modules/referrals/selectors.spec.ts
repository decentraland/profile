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
  let stateWithLoading: RootState
  let stateWithMultipleLoading: RootState
  let stateWithError: RootState
  let mockIsLoadingType: jest.MockedFunction<typeof isLoadingType>

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

    stateWithLoading = {
      referrals: {
        ...mockReferralsState,
        loading: [fetchReferralsRequest() as AnyAction]
      }
    } as RootState

    stateWithMultipleLoading = {
      referrals: {
        ...mockReferralsState,
        loading: [fetchReferralsRequest() as AnyAction, { type: 'OTHER_ACTION' } as AnyAction]
      }
    } as RootState

    stateWithError = {
      referrals: {
        ...mockReferralsState,
        error: 'Failed to fetch referrals'
      }
    } as RootState

    mockIsLoadingType = isLoadingType as jest.MockedFunction<typeof isLoadingType>
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("when getting the state's data", () => {
    it('should return the referrals data', () => {
      const result = getData(mockState)
      expect(result).toEqual({
        invitedUsersAccepted: 5,
        invitedUsersAcceptedViewed: 3
      })
    })
  })

  describe('when getting the loading state', () => {
    it('should return the loading state', () => {
      const result = getLoading(mockState)
      expect(result).toEqual([])
    })

    describe('and there are loading actions', () => {
      it('should return the correct loading state', () => {
        const result = getLoading(stateWithLoading)
        expect(result).toEqual([fetchReferralsRequest()])
      })
    })

    describe('and there are multiple loading actions', () => {
      it('should return the correct loading state', () => {
        const result = getLoading(stateWithMultipleLoading)
        expect(result).toEqual([fetchReferralsRequest(), { type: 'OTHER_ACTION' }])
      })
    })
  })

  describe('when getting the error state', () => {
    it('should return null when there is no error', () => {
      const result = getError(mockState)
      expect(result).toBeNull()
    })

    it('should return the error message when there is an error', () => {
      const result = getError(stateWithError)
      expect(result).toBe('Failed to fetch referrals')
    })
  })

  describe('when getting the invited users accepted count', () => {
    it('should return the invitedUsersAccepted value', () => {
      const result = getInvitedUsersAccepted(mockState)
      expect(result).toBe(5)
    })
  })

  describe('when getting the invited users accepted viewed count', () => {
    it('should return the invitedUsersAcceptedViewed value', () => {
      const result = getInvitedUsersAcceptedViewed(mockState)
      expect(result).toBe(3)
    })
  })

  describe('when checking if referrals are loading', () => {
    it('should return true when referrals are loading', () => {
      mockIsLoadingType.mockReturnValue(true)

      const result = isLoadingReferrals(mockState)
      expect(result).toBe(true)
      expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
    })

    it('should return false when referrals are not loading', () => {
      mockIsLoadingType.mockReturnValue(false)

      const result = isLoadingReferrals(mockState)
      expect(result).toBe(false)
      expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
    })

    it('should call isLoadingType with the correct loading state', () => {
      mockIsLoadingType.mockReturnValue(true)

      isLoadingReferrals(stateWithMultipleLoading)
      expect(mockIsLoadingType).toHaveBeenCalledWith([fetchReferralsRequest(), { type: 'OTHER_ACTION' }], fetchReferralsRequest.type)
    })
  })
})
