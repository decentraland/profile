import { TIERS } from './constants'
import { getTiersCompletedCount, calculateProgressPercentage } from './utils'

describe('calculateProgressPercentage', () => {
  describe('when totalSteps is 0', () => {
    it('should return 0', () => {
      const result = calculateProgressPercentage(0, 5)
      expect(result).toBe(0)
    })
  })

  describe('when totalSteps is negative', () => {
    it('should return 0', () => {
      const result = calculateProgressPercentage(-1, 5)
      expect(result).toBe(0)
    })
  })

  describe('when invitedUsersAccepted is at the first tier', () => {
    it('should return the exact number of invites', () => {
      const result = calculateProgressPercentage(9, 5)
      expect(result).toBe(5)
    })
  })

  describe('when invitedUsersAccepted is below first tier', () => {
    it('should return the exact number of invites', () => {
      const result = calculateProgressPercentage(9, 3)
      expect(result).toBe(3)
    })
  })

  describe('when invitedUsersAccepted is at the last tier', () => {
    it('should return maximum percentage', () => {
      const result = calculateProgressPercentage(9, 100)
      expect(result).toBeCloseTo(99.9, 1)
    })
  })

  describe('when invitedUsersAccepted is above the last tier', () => {
    it('should return maximum percentage', () => {
      const result = calculateProgressPercentage(9, 150)
      expect(result).toBeCloseTo(99.9, 1)
    })
  })

  describe('when invitedUsersAccepted is between tier thresholds', () => {
    it('should calculate correct percentage', () => {
      const result = calculateProgressPercentage(9, 7)
      expect(result).toBeCloseTo(9.44, 1)
    })
  })

  describe('when invitedUsersAccepted is exactly at a tier threshold', () => {
    it('should calculate correct percentage', () => {
      const result = calculateProgressPercentage(9, 30)
      expect(result).toBeCloseTo(49.4, 1)
    })
  })
})

describe('getTiersCompletedCount', () => {
  describe('when the user has no invites accepted', () => {
    it('should return 0 completed tiers', () => {
      const result = getTiersCompletedCount(0)
      expect(result).toBe(0)
    })
  })

  TIERS.forEach((tier, index: number) => {
    describe(`when the user has exactly ${tier.invitesAccepted} invites accepted`, () => {
      it(`should return ${index + 1} completed tier${index + 1 === 1 ? '' : 's'}`, () => {
        const result = getTiersCompletedCount(tier.invitesAccepted)
        expect(result).toBe(index + 1)
      })
    })
  })

  describe('when the user has more than 100 invites accepted', () => {
    it('should return 9 completed tiers', () => {
      const result = getTiersCompletedCount(150)
      expect(result).toBe(9)
    })
  })

  describe('when the user has invites between tier thresholds', () => {
    it('should return the correct number of completed tiers', () => {
      const result = getTiersCompletedCount(7)
      expect(result).toBe(1)
    })
  })
})
