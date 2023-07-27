import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  loggedInAddress?: string
  profile?: Profile
  profileAddress: string
  isSocialClientReady: boolean
}

export type OwnProps = Pick<Props, 'profileAddress' | 'loggedInAddress'>

export type MapStateProps = Pick<Props, 'profile' | 'isSocialClientReady'>
