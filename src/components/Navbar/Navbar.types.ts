import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar'
import { LoginRequestAction } from '../../modules/identity/action'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  isAuthDappEnabled: boolean
  isNavbarV2Enabled: boolean
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'isAuthDappEnabled' | 'isNavbarV2Enabled'>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
export type MapDispatch = Dispatch<OpenModalAction | LoginRequestAction>
