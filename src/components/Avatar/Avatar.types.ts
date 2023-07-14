import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  profile?: Profile
  profileAddress?: string
}

export type OwnProps = Pick<Props, 'profileAddress'>

export type MapStateProps = Pick<Props, 'profile'>
