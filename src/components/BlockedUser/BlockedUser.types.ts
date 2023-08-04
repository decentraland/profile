import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  loggedInAddress?: string
  profile?: Profile
  profileAddress: string
  isBlockedByLoggedUser: boolean
}

export type MapStateProps = Pick<Props, 'profile' | 'isBlockedByLoggedUser'>
export type OwnProps = Pick<Props, 'profileAddress' | 'loggedInAddress'>
