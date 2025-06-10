enum AnimationPhaseType {
  TIER_REACHED = 'tier_reached',
  WAITING_NEXT_TIER = 'waiting_next_tier'
}

type ReferralJourneyProps = { invitedUsersAccepted: number }

export { AnimationPhaseType }
export type { ReferralJourneyProps }
