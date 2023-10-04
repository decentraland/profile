import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { fetchCreationsRequest } from '../../modules/items/actions'
import { getError, getItems, getTotalItems, isLoadingCreations } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Creations from './Creations'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './Creations.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    items: getItems(state),
    totalItems: getTotalItems(state),
    error: getError(state),
    profileName: getProfileOfAddress(state, ownProps.profileAddress)?.avatars[0]?.name || 'Unknown',
    isLoading: isLoadingCreations(state) && false
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchCreations: fetchCreationsRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Creations)
