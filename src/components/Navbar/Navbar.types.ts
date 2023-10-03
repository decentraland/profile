import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar'
import { LoginRequestAction } from '../../modules/identity/action'

export type Props = Partial<NavbarProps> & {
  isConnected: boolean
  onSignIn: () => void
}

export type MapStateProps = Pick<Props, 'isConnected'>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
export type MapDispatch = Dispatch<OpenModalAction | LoginRequestAction>
