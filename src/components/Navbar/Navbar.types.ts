import { Dispatch } from '@reduxjs/toolkit'
import { NavbarProps } from 'decentraland-dapps/dist/containers/Navbar/Navbar.types'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { LoginRequestAction } from '../../modules/identity/action'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  isAuthDappEnabled: boolean
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'isAuthDappEnabled'>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
export type MapDispatch = Dispatch<OpenModalAction | LoginRequestAction>
