import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar.types'
import { LoginRequestAction } from '../../modules/identity/action'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  isAuthDappEnabled: boolean
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'isAuthDappEnabled'>
export type MapDispatchProps = Pick<Props, 'onClickSignIn'>
export type MapDispatch = Dispatch<OpenModalAction | LoginRequestAction>
