import { Dispatch } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { FetchCreationsRequestAction } from '../../modules/items/actions'
import { CreationsFetchOptions } from '../../modules/items/types'
import { View } from '../../utils/view'

export type Props = {
  profileAddress: string
  isLoading: boolean
  items: Item[]
  totalItems: number
  error: string | null
  view: View
  onFetchCreations: (options: CreationsFetchOptions) => void
  onOpenMobileFilters: () => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'items' | 'totalItems' | 'error'>
export type MapDispatchProps = Pick<Props, 'onFetchCreations' | 'onOpenMobileFilters'>
export type MapDispatch = Dispatch<FetchCreationsRequestAction | OpenModalAction>
