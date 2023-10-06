import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { MapDispatch, MapDispatchProps } from '../FiltersModal/FiltersModal.types'
import AssetsFiltersModal from './AssetsFiltersModal'

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onClose: () => closeModal('AssetsFiltersModal')
    },
    dispatch
  )

export default connect(undefined, mapDispatch)(AssetsFiltersModal)
