import { Dispatch } from '@reduxjs/toolkit'
import { fetchReferralsRequest } from '../../modules/referrals/actions'

export type Props = {
  profileAddress: string
  invitedUsersAccepted: number
  invitedUsersAcceptedViewed: number
  onFetchReferrals: typeof fetchReferralsRequest
  isReferralTestingButtonEnabled: boolean
}

export type MapStateProps = Pick<
  Props,
  'profileAddress' | 'invitedUsersAccepted' | 'invitedUsersAcceptedViewed' | 'isReferralTestingButtonEnabled'
>
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFetchReferrals'>
export type OwnProps = Pick<Props, 'profileAddress'>
