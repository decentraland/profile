import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { fetchNFTsRequest } from '../../modules/nfts/actions'
import { getError, getNFTs, getTotalNFTs, isLoading } from '../../modules/nfts/selectors'
import { RootState } from '../../modules/reducer'
import Creations from './Assets'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Assets.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    assets: getNFTs(state),
    total: getTotalNFTs(state),
    error: getError(state),
    isLoading: isLoading(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchAssets: fetchNFTsRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Creations)
