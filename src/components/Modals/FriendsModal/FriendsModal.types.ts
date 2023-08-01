import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'

export enum FriendsType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FRIENDS = 'friends',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MUTUALS = 'mutuals'
}

export type Metadata = {
  itemId: string
}

export type Props = Omit<ModalProps, 'metadata'> & {
  metadata: Metadata
  type: FriendsType
  friends: string[]
}

export type MapStateProps = Pick<Props, 'friends'>
