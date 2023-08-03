import { Dispatch } from '@reduxjs/toolkit'
import { FetchWorldsRequestAction } from '../../modules/world/actions'
import { World } from '../../modules/world/types'

export type Props = {
  address: string
  className?: string
  worlds: World[]
  isLoading: boolean
  hasNames: boolean
  isLoggedIn?: boolean
  onFetchWorlds: (address: string) => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'hasNames' | 'worlds'>
export type MapDispatchProps = Pick<Props, 'onFetchWorlds'>
export type MapDispatch = Dispatch<FetchWorldsRequestAction>
