import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { View } from '../../types'

export type Props = {
  profile?: Profile
  profileAddress: string
  view: View
}

export type OwnProps = Pick<Props, 'profileAddress' | 'view'>

export type MapStateProps = Pick<Props, 'profile'>
