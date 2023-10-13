import { Dispatch } from 'redux'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { FetchNFTsRequestAction } from '../../modules/nfts/actions'
import { NFTOptions, NFTResult } from '../../modules/nfts/types'
import { View } from '../../utils/view'

export type Props = {
  assets: NFTResult[]
  isLoading: boolean
  error: string | null
  total: number
  profileAddress: string
  view: View
  profileName: string
  onFetchAssets: (options: NFTOptions) => void
  onOpenMobileFilters: () => void
}

export type MapStateProps = Pick<Props, 'assets' | 'error' | 'isLoading' | 'total' | 'profileName'>
export type OwnProps = Omit<Props, keyof MapStateProps | keyof MapDispatchProps>
export type MapDispatchProps = Pick<Props, 'onFetchAssets' | 'onOpenMobileFilters'>
export type MapDispatch = Dispatch<FetchNFTsRequestAction | OpenModalAction>
