import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { Avatar } from '../../modules/profile/types'

export type Props = {
  loggedInAddress?: string
  profile?: Profile
  profileAddress: string
  isSocialClientReady: boolean
  onViewMore: (avatar: Avatar) => void
}

export type MapStateProps = Pick<Props, 'profile' | 'isSocialClientReady'>
export type MapDispatchProps = Pick<Props, 'onViewMore'>
export type MapDispatch = Dispatch<OpenModalAction>
export type OwnProps = Pick<Props, 'profileAddress' | 'loggedInAddress'>
