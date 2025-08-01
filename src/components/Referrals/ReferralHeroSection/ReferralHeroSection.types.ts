import { Avatar } from '../../../modules/profile/types'
import { View } from '../../../utils/view'

export type Props = {
  isLoading?: boolean
  error?: string | null
  view?: View
  profileAddress: string
  avatar?: Avatar
}
