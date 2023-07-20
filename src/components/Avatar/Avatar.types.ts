import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  profile?: Profile
  profileAddress: string
  loggedInAddress?: string
}

export type OwnProps = Pick<Props, 'profileAddress' | 'loggedInAddress'>

export type MapStateProps = Pick<Props, 'profile'>
