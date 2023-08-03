import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Avatar } from '../../../modules/profile/types'

export type Metadata = {
  avatar: Avatar
}

export type Props = Omit<ModalProps, 'metadata'> & {
  metadata: Metadata
}
