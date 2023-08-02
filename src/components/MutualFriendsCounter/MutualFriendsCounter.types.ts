import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { FetchMutualFriendsRequestAction } from '../../modules/social/actions'

export type Props = {
  isLoading: boolean
  className?: string
  count: number
  friendAddress: string
  firstMutuals: string[]
  onClick: () => void
  onFetchMutualFriends: () => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'count' | 'firstMutuals'>
export type MapDispatchProps = Pick<Props, 'onClick' | 'onFetchMutualFriends'>
export type MapDispatch = Dispatch<OpenModalAction | FetchMutualFriendsRequestAction>
export type OwnProps = Pick<Props, 'friendAddress'>
