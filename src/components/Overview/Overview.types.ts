import { Dispatch } from 'redux'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { FetchItemsRequestAction } from '../../modules/items/actions'

export type Props = {
  error: string | null
  isLoading: boolean
  items: Item[]
  onFetchItems: (wearableIds: string[]) => void
  wearableIds: string[]
  profileAddress: string
}

export type MapStateProps = Pick<Props, 'items' | 'error' | 'isLoading' | 'wearableIds'>
export type MapDispatchProps = Pick<Props, 'onFetchItems'>

export type MapDispatch = Dispatch<FetchItemsRequestAction>

export type OwnProps = Pick<Props, 'profileAddress'>
