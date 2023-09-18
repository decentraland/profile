import { Dispatch } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas'
import { FetchCreationsRequestAction } from '../../modules/items/actions'
import { CreationsFetchOptions } from '../../modules/items/types'
import { View } from '../../utils/view'

export type Props = {
  profileAddress: string
  isLoading: boolean
  items: Item[]
  error: string | null
  view: View
  onFetchCreations: (options: CreationsFetchOptions) => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'items' | 'error'>
export type MapDispatchProps = Pick<Props, 'onFetchCreations'>
export type MapDispatch = Dispatch<FetchCreationsRequestAction>
