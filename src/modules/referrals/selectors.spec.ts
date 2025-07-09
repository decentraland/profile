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
  let mockIsLoadingType: jest.MockedFunction<typeof isLoadingType>

  beforeEach(() => {
    mockReferralsState = {
      data: {
        invitedUsersAccepted: 5,
        invitedUsersAcceptedViewed: 3,
        rewardImages: []
      },
      loading: [],
      error: null
    }

    mockState = {
      referrals: mockReferralsState
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
        invitedUsersAcceptedViewed: 3,
        rewardImages: []
      })
    })
  })

  describe('when getting the loading state', () => {
    let stateWithLoading: RootState
    let stateWithMultipleLoading: RootState

    beforeEach(() => {
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
    })

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
    let stateWithError: RootState

    beforeEach(() => {
      stateWithError = {
        referrals: {
          ...mockReferralsState,
          error: 'Failed to fetch referrals'
        }
      } as RootState
    })

    describe('and there is no error', () => {
      it('should return null', () => {
        const result = getError(mockState)
        expect(result).toBeNull()
      })
    })

    describe('and there is an error', () => {
      it('should return the error message', () => {
        const result = getError(stateWithError)
        expect(result).toBe('Failed to fetch referrals')
      })
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
    let stateWithMultipleLoading: RootState

    beforeEach(() => {
      stateWithMultipleLoading = {
        referrals: {
          ...mockReferralsState,
          loading: [fetchReferralsRequest() as AnyAction, { type: 'OTHER_ACTION' } as AnyAction]
        }
      } as RootState
    })

    describe('and referrals are loading', () => {
      it('should return true', () => {
        mockIsLoadingType.mockReturnValue(true)

        const result = isLoadingReferrals(mockState)
        expect(result).toBe(true)
        expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
      })
    })

    describe('and referrals are not loading', () => {
      it('should return false', () => {
        mockIsLoadingType.mockReturnValue(false)

        const result = isLoadingReferrals(mockState)
        expect(result).toBe(false)
        expect(mockIsLoadingType).toHaveBeenCalledWith([], fetchReferralsRequest.type)
      })
    })

    describe('and there are multiple loading actions', () => {
      it('should call isLoadingType with the correct loading state', () => {
        mockIsLoadingType.mockReturnValue(true)

        isLoadingReferrals(stateWithMultipleLoading)
        expect(mockIsLoadingType).toHaveBeenCalledWith([fetchReferralsRequest(), { type: 'OTHER_ACTION' }], fetchReferralsRequest.type)
      })
    })
  })
})
