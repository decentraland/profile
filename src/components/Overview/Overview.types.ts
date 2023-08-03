import { Dispatch } from 'redux'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { Profile } from '@dcl/schemas/dist/platform/profile'
import { LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'
import { FetchItemsRequestAction } from '../../modules/items/actions'

export type Props = {
  error: string | null
  isLoading: LoadingState
  items: Item[]
  onFetchItems: (wearableIds: string[]) => void
  profile?: Profile
  profileAddress: string
}

export type MapStateProps = Pick<Props, 'items' | 'error' | 'isLoading' | 'profile'>
export type MapDispatchProps = Pick<Props, 'onFetchItems'>

export type MapDispatch = Dispatch<FetchItemsRequestAction>

export type OwnProps = Pick<Props, 'profileAddress'>
