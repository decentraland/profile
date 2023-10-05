import { Dispatch } from 'redux'
import { FetchNFTsRequestAction } from '../../modules/nfts/actions'
import { NFTOptions, NFTResult } from '../../modules/nfts/types'

export type Props = {
  assets: NFTResult[]
  isLoading: boolean
  error: string | null
  total: number
  profileAddress: string
  onFetchAssets: (options: NFTOptions) => void
}

export type MapStateProps = Pick<Props, 'assets' | 'error' | 'isLoading' | 'total'>
export type MapDispatchProps = Pick<Props, 'onFetchAssets'>
export type MapDispatch = Dispatch<FetchNFTsRequestAction>
