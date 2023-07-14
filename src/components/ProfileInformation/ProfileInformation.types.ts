import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  isLoggedInProfile: boolean
  profile?: Profile
  profileAddress?: string
}

export type OwnProps = Pick<Props, 'profileAddress' | 'isLoggedInProfile'>

export type MapStateProps = Pick<Props, 'profile'>
