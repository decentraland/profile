import { Dispatch } from '@reduxjs/toolkit'
import { fetchReferralsRequest } from '../../modules/referrals/actions'

export type Props = {
  profileAddress: string
  invitedUsersAccepted: number
  invitedUsersAcceptedViewed: number
  onFetchReferrals: typeof fetchReferralsRequest
}

export type MapStateProps = Pick<Props, 'profileAddress' | 'invitedUsersAccepted' | 'invitedUsersAcceptedViewed'>
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFetchReferrals'>
export type OwnProps = Pick<Props, 'profileAddress'>
