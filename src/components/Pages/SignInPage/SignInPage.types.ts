import { Dispatch } from '@reduxjs/toolkit'
import { LoginRequestAction, loginRequest } from '../../../modules/identity/action'

export type Props = {
  isConnected: boolean
  isConnecting: boolean
  onConnect: typeof loginRequest
}

export type MapStateProps = Pick<Props, 'isConnected' | 'isConnecting'>
export type MapDispatch = Dispatch<LoginRequestAction>
export type MapDispatchProps = Pick<Props, 'onConnect'>
