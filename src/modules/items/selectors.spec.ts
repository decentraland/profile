import { Avatar, Item } from '@dcl/schemas'
import { RootState } from '../reducer'
import { fetchCreationsRequest, fetchItemsByUrnRequest } from './actions'
import { buildInitialState } from './reducer'
import { getError, getItems, getProfileWearableUrns, isLoadingCreations, isLoadingItems } from './selectors'

let state: RootState

beforeEach(() => {
  state = {
    items: buildInitialState()
  } as RootState
})

describe('when getting the error from the state', () => {
  beforeEach(() => {
    state.items.error = 'error'
  })

  it('should return the error', () => {
    expect(getError(state)).toBe(state.items.error)
  })
})

describe('when getting the items from the state', () => {
  beforeEach(() => {
    state.items.data.items = [{ id: 'anId' } as Item]
  })

  it('should return the items', () => {
    expect(getItems(state)).toBe(state.items.data.items)
  })
})

describe('when getting the total items from the state', () => {
  beforeEach(() => {
    state.items.data.total = 10
  })

  it('should return the total items', () => {
    expect(getItems(state)).toBe(state.items.data.items)
  })
})

describe('when getting if the items are being loaded', () => {
  describe('and the items are not being loaded', () => {
    beforeEach(() => {
      state.items.loading = []
    })

    it('should return false', () => {
      expect(isLoadingItems(state)).toBe(false)
    })
  })

  describe('and the items are being loaded', () => {
    beforeEach(() => {
      state.items.loading = [fetchItemsByUrnRequest(['anId'])]
    })

    it('should return true', () => {
      expect(isLoadingItems(state)).toBe(true)
    })
  })
})

describe('when getting the wearable urns of a given profile', () => {
  let address: string

  beforeEach(() => {
    address = 'anAddress'
    state = {
      ...state,
      profile: {
        ...state.profile,
        data: {
          [address]: {
            avatars: [
              {
                avatar: {
                  wearables: [
                    'urn:decentraland:off-chain:base-avatars:eyebrows_00',
                    'urn:decentraland:off-chain:base-avatars:casual_hair_01',
                    'urn:decentraland:off-chain:base-avatars:eyes_05',
                    'urn:decentraland:off-chain:base-avatars:mouth_06',
                    'urn:decentraland:off-chain:base-avatars:handlebar',
                    'urn:decentraland:ethereum:collections-v1:community_contest:cw_casinovisor_hat',
                    'urn:decentraland:ethereum:collections-v1:dg_summer_2020:dg_mink_fur_coat_upper_body',
                    'urn:decentraland:matic:collections-v2:0x213efc9acb3f51cdb7ca208fb28b49e792441107:2',
                    'urn:decentraland:matic:collections-v2:0x62e9f0f793164a2edbd4dc739e3b53da623c8944:2',
                    'urn:decentraland:matic:collections-v2:0x9d9b55db299c46e5118675361d4a5a2ba49b54b6:4',
                    'urn:decentraland:matic:collections-v2:0xc25744bed31b2ae67e349a8ef59dfa48e064140f:0'
                  ]
                }
              } as unknown as Avatar
            ]
          }
        }
      }
    }
  })

  describe('and the profile does not exist', () => {
    it('should return an empty array', () => {
      expect(getProfileWearableUrns(state, 'anotherAddress')).toEqual([])
    })
  })

  describe('and the profile exists', () => {
    it('should return the wearable urns of the user items', () => {
      expect(getProfileWearableUrns(state, address)).toEqual(state.profile.data[address].avatars[0].avatar.wearables)
    })
  })
})

describe('when getting if the creations are being loaded', () => {
  describe('and the creations are not being loaded', () => {
    beforeEach(() => {
      state.items.loading = []
    })

    it('should return false', () => {
      expect(isLoadingCreations(state)).toBe(false)
    })
  })

  describe('and the creations are being loaded', () => {
    beforeEach(() => {
      state.items.loading = [fetchCreationsRequest({ creator: '0x1' })]
    })

    it('should return true', () => {
      expect(isLoadingCreations(state)).toBe(true)
    })
  })
})
