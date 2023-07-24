import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../modules/reducer'
import { fetchWorldsRequest } from '../../modules/world/actions'
import { getActiveWorlds, hasAName, isLoadingWorlds } from '../../modules/world/selectors'
import WorldsButton from './WorldsButton'
import { MapStateProps, MapDispatch, MapDispatchProps } from './WorldsButton.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    worlds: getActiveWorlds(state),
    hasNames: hasAName(state),
    isLoading: isLoadingWorlds(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onFetchWorlds: fetchWorldsRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(WorldsButton)
