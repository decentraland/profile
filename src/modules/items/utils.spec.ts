import { removeIdFromWearableUrn, isEthereumWearable, isMaticWearable } from './utils'

describe('when checking if a urn belongs to a matic wearable', () => {
  let urn: string

  describe('and the urn belongs to a matic wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:matic:collections-v2:0xc25744bed31b2ae67e349a8ef59dfa48e064140f:0'
    })

    it('should return true', () => {
      expect(isMaticWearable(urn)).toBe(true)
    })
  })

  describe('and the urn does not belong to a matic wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:ethereum:collections-v1:community_contest:cw_casinovisor_hat'
    })

    it('should return false', () => {
      expect(isMaticWearable(urn)).toBe(false)
    })
  })
})

describe('when checking if a urn belongs to a ethereum wearable', () => {
  let urn: string

  describe('and the urn belongs to a ethereum wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:ethereum:collections-v1:community_contest:cw_casinovisor_hat'
    })

    it('should return true', () => {
      expect(isEthereumWearable(urn)).toBe(true)
    })
  })

  describe('and the urn does not belong to a ethereum wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:matic:collections-v2:0xc25744bed31b2ae67e349a8ef59dfa48e064140f:0'
    })

    it('should return false', () => {
      expect(isEthereumWearable(urn)).toBe(false)
    })
  })
})

describe('when removing the id from a wearable urn', () => {
  let urn: string

  describe('and the wearable is not a collection-v2 wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:off-chain:base-avatars:eyebrows_00'
    })

    it('should return the same urn', () => {
      expect(removeIdFromWearableUrn(urn)).toBe(urn)
    })
  })

  describe('and the wearable is a collection-v2 wearable', () => {
    beforeEach(() => {
      urn = 'urn:decentraland:matic:collections-v2:0xc25744bed31b2ae67e349a8ef59dfa48e064140f:0'
    })

    it('should return the urn without its id', () => {
      expect(removeIdFromWearableUrn(urn)).toBe('urn:decentraland:matic:collections-v2:0xc25744bed31b2ae67e349a8ef59dfa48e064140f')
    })
  })
})
