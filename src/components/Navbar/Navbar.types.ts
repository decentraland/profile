import { NavbarProps } from 'decentraland-ui'

export type Props = Partial<NavbarProps> & {
  isConnected: boolean
  hasPendingTransactions: boolean
  enablePartialSupportAlert?: boolean
}

export type OwnProps = Pick<Props, 'enablePartialSupportAlert'>
