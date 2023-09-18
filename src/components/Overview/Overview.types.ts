import { Dispatch } from 'redux'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { FetchItemsByUrnRequestAction } from '../../modules/items/actions'

export type Props = {
  error: string | null
  isLoading: boolean
  items: Item[]
  onFetchItems: (wearableIds: string[]) => void
  wearableIds: string[]
  profileAddress: string
  className?: string
  loggedInAddress?: string
  profile?: Profile
}

export type MapStateProps = Pick<Props, 'items' | 'error' | 'isLoading' | 'wearableIds' | 'profile'>
export type MapDispatchProps = Pick<Props, 'onFetchItems'>

export type MapDispatch = Dispatch<FetchItemsByUrnRequestAction>

export type OwnProps = Pick<Props, 'profileAddress' | 'loggedInAddress'>
