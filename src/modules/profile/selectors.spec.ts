import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { RootState } from '../reducer'
import { isBlockedByLoggedUser, hasBlockedLoggedUser } from './selectors'
import { Avatar } from './types'

let profileAddress: string
let profile: Profile
let loggedAddress: string
let blockedAddress: string

let state: RootState

beforeEach(() => {
  profileAddress = '0x0profileAddress'
  loggedAddress = '0x0loggedAddress'
  blockedAddress = '0x0blockedAddress'

  profile = {
    avatars: [{} as Avatar]
  } as Profile

  state = {
    wallet: {
      data: null
    },
    profile: { data: {} }
  } as RootState
})

describe('when selecting if the profile being viewed is blocked by the logged user', () => {
  describe('and the user is not yet logged in', () => {
    beforeEach(() => {
      state.wallet.data = null
    })

    it('should return false', () => {
      expect(isBlockedByLoggedUser(state, profileAddress)).toBe(false)
    })
  })

  describe('and the user is logged in', () => {
    beforeEach(() => {
      state.wallet.data = {
        address: loggedAddress
      } as Wallet

      state.profile.data = {
        [loggedAddress]: profile
      }
    })

    describe('and the logged user has an empty array of blocked addresses', () => {
      beforeEach(() => {
        state.profile.data[loggedAddress].avatars[0].blocked = []
      })

      it('should return false', () => {
        expect(isBlockedByLoggedUser(state, profileAddress)).toBe(false)
      })
    })

    describe('and the logged user has blocked addresses', () => {
      describe('and does not include the address of the viewed profile', () => {
        beforeEach(() => {
          state.profile.data[loggedAddress].avatars[0].blocked = [blockedAddress]
        })

        it('should return false', () => {
          expect(isBlockedByLoggedUser(state, profileAddress)).toBe(false)
        })
      })

      describe('and includes the address of the viewed profile', () => {
        beforeEach(() => {
          state.profile.data[loggedAddress].avatars[0].blocked = [blockedAddress, profileAddress]
        })

        it('should return true', () => {
          expect(isBlockedByLoggedUser(state, profileAddress)).toBe(true)
        })
      })

      describe('and includes an upper case version of the viewed profile address', () => {
        beforeEach(() => {
          state.profile.data[loggedAddress].avatars[0].blocked = [blockedAddress, profileAddress.toUpperCase()]
        })

        it('should return true', () => {
          expect(isBlockedByLoggedUser(state, profileAddress)).toBe(true)
        })
      })
    })
  })
})

describe('when selecting if the logged user is blocked by the profile being viewed', () => {
  describe('and the user is not yet logged in', () => {
    beforeEach(() => {
      state.wallet.data = null
    })

    it('should return false', () => {
      expect(hasBlockedLoggedUser(state, profileAddress)).toBe(false)
    })
  })

  describe('and the user is logged in', () => {
    beforeEach(() => {
      state.wallet.data = {
        address: loggedAddress
      } as Wallet

      state.profile.data = {
        [profileAddress]: profile
      }
    })

    describe('and the viewed profile has an empty array of blocked addresses', () => {
      beforeEach(() => {
        state.profile.data[profileAddress].avatars[0].blocked = []
      })

      it('should return false', () => {
        expect(hasBlockedLoggedUser(state, profileAddress)).toBe(false)
      })
    })

    describe('and the viewed profile has blocked addresses', () => {
      describe('and does not include the address of the logged user', () => {
        beforeEach(() => {
          state.profile.data[profileAddress].avatars[0].blocked = [blockedAddress]
        })

        it('should return false', () => {
          expect(hasBlockedLoggedUser(state, profileAddress)).toBe(false)
        })
      })

      describe('and includes the address of the logged user', () => {
        beforeEach(() => {
          state.profile.data[profileAddress].avatars[0].blocked = [blockedAddress, loggedAddress]
        })

        it('should return true', () => {
          expect(hasBlockedLoggedUser(state, profileAddress)).toBe(true)
        })
      })

      describe('and includes an upper case version of the logged user address', () => {
        beforeEach(() => {
          state.profile.data[profileAddress].avatars[0].blocked = [blockedAddress, loggedAddress.toUpperCase()]
        })

        it('should return true', () => {
          expect(hasBlockedLoggedUser(state, profileAddress)).toBe(true)
        })
      })
    })
  })
})
