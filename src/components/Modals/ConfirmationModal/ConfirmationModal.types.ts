import { FriendshipStatus } from '../../../modules/social/types'

export type Props = {
  avatarName?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: FriendshipStatus
}
