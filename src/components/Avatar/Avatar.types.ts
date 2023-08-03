import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  profile?: Profile
  profileAddress: string
  isLoggedIn?: boolean
}

export type OwnProps = Pick<Props, 'profileAddress' | 'isLoggedIn'>

export type MapStateProps = Pick<Props, 'profile'>
