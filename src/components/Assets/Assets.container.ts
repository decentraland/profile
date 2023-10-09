import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { fetchNFTsRequest } from '../../modules/nfts/actions'
import { getError, getNFTs, getTotalNFTs, isLoading } from '../../modules/nfts/selectors'
import { RootState } from '../../modules/reducer'
import Assets from './Assets'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './Assets.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    assets: getNFTs(state),
    total: getTotalNFTs(state),
    error: getError(state),
    isLoading: isLoading(state),
    profileName: getProfileOfAddress(state, ownProps.profileAddress)?.avatars[0]?.name || 'Unknown'
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchAssets: fetchNFTsRequest,
      onOpenFiltersModal: () => openModal('AssetsFiltersModal')
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Assets)
