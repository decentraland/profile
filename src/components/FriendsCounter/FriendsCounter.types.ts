import { Dispatch } from '@reduxjs/toolkit'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'

export type Props = {
  isLoading: boolean
  className?: string
  count: number
  onClick: () => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'count'>
export type MapDispatchProps = Pick<Props, 'onClick'>
export type MapDispatch = Dispatch<OpenModalAction>
