import { Dispatch } from 'redux'
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
}

export type MapStateProps = Pick<Props, 'assets' | 'error' | 'isLoading' | 'total' | 'profileName'>
export type OwnProps = Omit<Props, keyof MapStateProps | keyof MapDispatchProps>
export type MapDispatchProps = Pick<Props, 'onFetchAssets'>
export type MapDispatch = Dispatch<FetchNFTsRequestAction>
