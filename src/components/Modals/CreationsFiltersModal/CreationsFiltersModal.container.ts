import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import FiltersModal from '../FiltersModal/FiltersModal'
import { MapDispatch, MapDispatchProps } from '../FiltersModal/FiltersModal.types'

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onClose: () => closeModal('CreationsFiltersModal')
    },
    dispatch
  )

export default connect(undefined, mapDispatch)(FiltersModal)
