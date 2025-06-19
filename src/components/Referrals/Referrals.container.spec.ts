import { RootState } from '../../modules/reducer'
import { fetchReferralsRequest } from '../../modules/referrals/actions'
import { getError, isLoadingReferrals, getInvitedUsersAccepted, getInvitedUsersAcceptedViewed } from '../../modules/referrals/selectors'

describe('Referrals Container', () => {
  let state: Partial<RootState>

  beforeEach(() => {
    state = {
      referrals: {
        data: {
          invitedUsersAccepted: 5,
          invitedUsersAcceptedViewed: 3
        },
        loading: [],
        error: null
      }
    }
  })

  describe('selectors', () => {
    it('should return correct loading state', () => {
      const result = isLoadingReferrals(state as RootState)
      expect(result).toBe(false)
    })

    it('should return correct error state', () => {
      const result = getError(state as RootState)
      expect(result).toBe(null)
    })

    it('should return correct invitedUsersAccepted', () => {
      const result = getInvitedUsersAccepted(state as RootState)
      expect(result).toBe(5)
    })

    it('should return correct invitedUsersAcceptedViewed', () => {
      const result = getInvitedUsersAcceptedViewed(state as RootState)
      expect(result).toBe(3)
    })
  })

  describe('actions', () => {
    it('should create fetchReferralsRequest action', () => {
      const action = fetchReferralsRequest()
      expect(action.type).toBe('[Request] Fetch Referrals')
    })
  })
})
