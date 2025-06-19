import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { View } from '../../utils/view'

export type Props = {
  profile?: Profile
  profileAddress: string
  view: View
  isUnityWearablePreviewEnabled: boolean
}

export type OwnProps = Pick<Props, 'profileAddress' | 'view'>

export type MapStateProps = Pick<Props, 'profile' | 'isUnityWearablePreviewEnabled'>
