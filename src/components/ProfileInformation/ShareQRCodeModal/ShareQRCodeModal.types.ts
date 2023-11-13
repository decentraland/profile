import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  profile?: Profile
  profileAddress: string
  onClose: () => void
}
