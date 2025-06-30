import { Dispatch } from '@reduxjs/toolkit'
import { setReferralEmailRequest } from '../../../modules/referrals/actions'

enum AnimationPhase {
  TIER_REACHED = 'tier_reached',
  WAITING_NEXT_TIER = 'waiting_next_tier'
}

type ReferralJourneyProps = {
  invitedUsersAccepted: number
  onSetReferralEmail: (email: string) => unknown
}

type MapStateProps = {
  invitedUsersAccepted: number
}

type MapDispatch = Dispatch

type MapDispatchProps = {
  onSetReferralEmail: typeof setReferralEmailRequest
}

type OwnProps = {
  invitedUsersAccepted: number
}

export { AnimationPhase }
export type { ReferralJourneyProps, MapStateProps, MapDispatch, MapDispatchProps, OwnProps }
