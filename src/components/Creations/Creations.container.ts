import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { fetchCreationsRequest } from '../../modules/items/actions'
import { getError, getItems, getTotalItems, isLoadingCreations } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Creations from './Creations'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Creations.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    items: getItems(state),
    totalItems: getTotalItems(state),
    error: getError(state),
    isLoading: isLoadingCreations(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchCreations: fetchCreationsRequest,
      onOpenMobileFilters: () => openModal('CreationsFiltersModal')
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(Creations)
