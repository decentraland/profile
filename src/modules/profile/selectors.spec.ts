import { LoadProfileRequestAction, loadProfileRequest } from 'decentraland-dapps/dist/modules/profile/actions'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { RootState } from '../reducer'
import { EnhancedFetchProfileRequestAction, enhancedFetchProfileRequest } from './action'
import { isBlockedByLoggedUser, hasBlockedLoggedUser, isLoadingProfile, getProfileWithName, getErrorLoadingProfile } from './selectors'
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

describe('when selecting if a profile is being loaded', () => {
  let action: EnhancedFetchProfileRequestAction | LoadProfileRequestAction
  let address: string

  beforeEach(() => {
    address = '0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca'
  })

  describe('and the profile is being loaded through the load profile action', () => {
    beforeEach(() => {
      action = loadProfileRequest(address)
    })

    describe('and the profile is not being loaded', () => {
      beforeEach(() => {
        state.profile.loading = [loadProfileRequest('anotherAddress')]
      })

      it('should return false', () => {
        expect(isLoadingProfile(state, address)).toBe(false)
      })
    })

    describe('and the profile is being loaded', () => {
      beforeEach(() => {
        state.profile.loading = [action]
      })

      it('should return true', () => {
        expect(isLoadingProfile(state, address)).toBe(true)
      })
    })
  })

  describe('and the profile is being loaded through the enhanced fetch profile action', () => {
    beforeEach(() => {
      action = enhancedFetchProfileRequest(address)
    })

    describe('and the profile is not being loaded', () => {
      beforeEach(() => {
        state.profile.loading = [enhancedFetchProfileRequest('anotherAddress')]
      })

      it('should return false', () => {
        expect(isLoadingProfile(state, address)).toBe(false)
      })
    })

    describe('and the profile is being loaded', () => {
      beforeEach(() => {
        state.profile.loading = [action]
      })

      it('should return true', () => {
        expect(isLoadingProfile(state, address)).toBe(true)
      })
    })
  })
})

describe('when getting a profile by name', () => {
  let name: string
  beforeEach(() => {
    name = 'name'
    state.profile.data[name] = profile
  })

  describe("and there's no profile with the same active name", () => {
    beforeEach(() => {
      state.profile.data[name].avatars[0].name = name
      state.profile.data[name].avatars[0].hasClaimedName = false
    })

    it('should return undefined', () => {
      expect(getProfileWithName(state, name)).toBeUndefined()
    })
  })

  describe("and there's a profile with the same active name", () => {
    beforeEach(() => {
      state.profile.data[name].avatars[0].name = name
      state.profile.data[name].avatars[0].hasClaimedName = true
    })

    it('should return the profile', () => {
      expect(getProfileWithName(state, name)).toBe(profile)
    })
  })
})

describe('when getting if loading a profile with an address or name has failed', () => {
  let name: string
  beforeEach(() => {
    name = 'name'
  })

  describe('and there are no errors for the given address or name', () => {
    beforeEach(() => {
      state.profile.enhancedProfileFetchErrors = {}
    })

    it('should return undefined', () => {
      expect(getErrorLoadingProfile(state, name)).toBeUndefined()
    })
  })

  describe('and there are errors for the given address or name', () => {
    beforeEach(() => {
      state.profile.enhancedProfileFetchErrors = {
        [name]: 'anError'
      }
    })

    it('should return true', () => {
      expect(getErrorLoadingProfile(state, name)).toBe(state.profile.enhancedProfileFetchErrors[name])
    })
  })
})
