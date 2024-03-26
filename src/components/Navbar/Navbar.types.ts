import { Dispatch } from '@reduxjs/toolkit'
import { AuthIdentity } from '@dcl/crypto'
import { NavbarProps } from 'decentraland-dapps/dist/containers/Navbar/Navbar.types'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { LoginRequestAction } from '../../modules/identity/action'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  identity?: AuthIdentity
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'identity'>
export type MapDispatch = Dispatch<OpenModalAction | LoginRequestAction>
