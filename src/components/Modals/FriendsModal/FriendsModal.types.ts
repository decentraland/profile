import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'

export enum FriendsType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FRIENDS = 'friends',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MUTUALS = 'mutuals'
}

export type Metadata = {
  type: FriendsType
}

export type Props = Omit<ModalProps, 'metadata'> & {
  metadata: Metadata
  friends: string[]
}

export type MapStateProps = Pick<Props, 'friends'>
export type OwnProps = Pick<Props, 'metadata'>
