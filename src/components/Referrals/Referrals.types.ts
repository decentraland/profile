import { Dispatch } from '@reduxjs/toolkit'
import { fetchReferralsRequest } from '../../modules/referrals/actions'
import { View } from '../../utils/view'

export type Props = {
  isLoading: boolean
  error: string | null
  view: View
  profileAddress: string
  invitedUsersAccepted: number
  invitedUsersAcceptedViewed: number
  onFetchReferrals: typeof fetchReferralsRequest
}

export type MapStateProps = Pick<Props, 'isLoading' | 'error' | 'profileAddress' | 'invitedUsersAccepted' | 'invitedUsersAcceptedViewed'>
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFetchReferrals'>
export type OwnProps = Pick<Props, 'view' | 'profileAddress'>
