import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { PeerAPI } from 'decentraland-dapps/dist/lib/peer'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { MarketplaceGraphClient } from '../../lib/MarketplaceGraphClient'
import { enhancedFetchProfileFailure, enhancedFetchProfileRequest, enhancedFetchProfileSuccess } from './action'
import { profileSagas } from './sagas'
import { Avatar } from './types'

let marketplaceGraphClient: MarketplaceGraphClient
let peerApi: PeerAPI

beforeEach(() => {
  marketplaceGraphClient = new MarketplaceGraphClient('aUrl')
  peerApi = new PeerAPI('aUrl')
})

describe('when handling the enhanced request action to fetch the profile', () => {
  describe('and the action payload contains an invalid name', () => {
    let name: string

    beforeEach(() => {
      name = '.$%&/()=?¿'
    })

    it('should put an enhanced profile fetch failure action with the error', () => {
      return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
        .put(enhancedFetchProfileFailure({ address: name, error: `Invalid name ${name}` }))
        .dispatch(enhancedFetchProfileRequest(name))
        .silentRun()
    })
  })

  describe('and the action payload contains a valid name', () => {
    let name: string
    let profile: Profile

    beforeEach(() => {
      name = 'aValidName'
    })

    describe('and the name has no owner', () => {
      it('should put an enhanced profile fetch failure action with the error', () => {
        return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
          .provide([[call([marketplaceGraphClient, 'fetchENSNameOwner'], name), Promise.resolve(null)]])
          .put(enhancedFetchProfileFailure({ address: name, error: `No owner found for ${name}` }))
          .dispatch(enhancedFetchProfileRequest(name))
          .silentRun()
      })
    })

    describe("and the profile for the owner doesn't exist", () => {
      let errorMessage: string
      let address: string

      beforeEach(() => {
        address = '0x0'
        errorMessage = `No profile found for ${name}`
      })

      it('should put an enhanced profile fetch failure action with the error', () => {
        return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
          .provide([
            [call([marketplaceGraphClient, 'fetchENSNameOwner'], name), Promise.resolve(address)],
            [call([peerApi, 'fetchProfile'], address), Promise.reject(new Error(errorMessage))]
          ])
          .put(enhancedFetchProfileFailure({ address, error: errorMessage }))
          .dispatch(enhancedFetchProfileRequest(name))
          .silentRun()
      })
    })

    describe('and the profile for the owner exists', () => {
      let address: string

      beforeEach(() => {
        address = '0x0'
        profile = { avatars: [{ userId: address } as Avatar] }
      })

      describe('and the owner does not have any active name', () => {
        beforeEach(() => {
          profile.avatars[0].hasClaimedName = false
        })

        it('should put an enhanced profile fetch failure action with the error', () => {
          return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
            .provide([
              [call([marketplaceGraphClient, 'fetchENSNameOwner'], name), Promise.resolve(address)],
              [call([peerApi, 'fetchProfile'], address), Promise.resolve(profile)]
            ])
            .put(enhancedFetchProfileFailure({ address, error: `Profile for ${name} found with a different active name` }))
            .dispatch(enhancedFetchProfileRequest(name))
            .silentRun()
        })
      })

      describe('and the owner has an active name', () => {
        beforeEach(() => {
          profile.avatars[0].hasClaimedName = true
        })

        describe('and the active name is not the same one as the action payload', () => {
          beforeEach(() => {
            profile.avatars[0].name = 'anotherName'
          })

          it('should put an enhanced profile fetch failure action with the error', () => {
            return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
              .provide([
                [call([marketplaceGraphClient, 'fetchENSNameOwner'], name), Promise.resolve(address)],
                [call([peerApi, 'fetchProfile'], address), Promise.resolve(profile)]
              ])
              .put(enhancedFetchProfileFailure({ address, error: `Profile for ${name} found with a different active name` }))
              .dispatch(enhancedFetchProfileRequest(name))
              .silentRun()
          })
        })

        describe('and the active name is the same one as the action payload', () => {
          beforeEach(() => {
            profile.avatars[0].name = name
          })

          it('should put an enhanced profile fetch success action with the profile', () => {
            return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
              .provide([
                [call([marketplaceGraphClient, 'fetchENSNameOwner'], name), Promise.resolve(address)],
                [call([peerApi, 'fetchProfile'], address), Promise.resolve(profile)]
              ])
              .put(enhancedFetchProfileSuccess({ address, profile }))
              .dispatch(enhancedFetchProfileRequest(name))
              .silentRun()
          })
        })
      })
    })
  })

  describe('and the action payload contains an address', () => {
    let address: string

    beforeEach(() => {
      address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
    })

    describe("and the profile doesn't exist for the address", () => {
      let errorMessage: string

      beforeEach(() => {
        errorMessage = `No profile found for ${address}`
      })

      it('should put an enhanced profile fetch failure action with the error', () => {
        return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
          .provide([[call([peerApi, 'fetchProfile'], address), Promise.reject(new Error(errorMessage))]])
          .put(enhancedFetchProfileFailure({ address: address, error: `No profile found for ${address}` }))
          .dispatch(enhancedFetchProfileRequest(address))
          .silentRun()
      })
    })

    describe('and the profile exists for the address', () => {
      let profile: Profile

      beforeEach(() => {
        profile = { avatars: [{ userId: address, name: 'aName', hasClaimedName: true } as Avatar] }
      })

      it('should put an enhanced profile fetch success action with the profile', () => {
        return expectSaga(profileSagas, marketplaceGraphClient, peerApi)
          .provide([[call([peerApi, 'fetchProfile'], address), Promise.resolve(profile)]])
          .put(enhancedFetchProfileSuccess({ address, profile }))
          .dispatch(enhancedFetchProfileRequest(address))
          .silentRun()
      })
    })
  })
})
