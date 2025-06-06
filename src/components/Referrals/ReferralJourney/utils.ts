import { tiers } from './constants'

const ANIMATION_DURATION = 800

const SEGMENT_PERCENTAGE = 11.1
const OFFSET = 5

const calculateProgressPercentage = (totalSteps: number, invitedUsersAccepted: number): number => {
  if (totalSteps <= 0) return 0

  if (invitedUsersAccepted <= tiers[0].invitesAccepted) {
    return invitedUsersAccepted
  }

  if (invitedUsersAccepted >= tiers[tiers.length - 1].invitesAccepted) {
    return totalSteps * SEGMENT_PERCENTAGE
  }

  let prevTierIndex = 0
  for (let i = 0; i < tiers.length; i++) {
    if (invitedUsersAccepted < tiers[i].invitesAccepted) {
      prevTierIndex = i - 1
      break
    }
  }
  const prevTier = tiers[prevTierIndex]
  const nextTier = tiers[prevTierIndex + 1]
  const invitesNeeded = nextTier.invitesAccepted - prevTier.invitesAccepted
  const invitesProgress = invitedUsersAccepted - prevTier.invitesAccepted
  const progressPercentage = (invitesProgress / invitesNeeded) * SEGMENT_PERCENTAGE
  const basePercentage = prevTierIndex * SEGMENT_PERCENTAGE + OFFSET
  return basePercentage + progressPercentage
}

export { ANIMATION_DURATION, calculateProgressPercentage }
