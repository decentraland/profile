import { connect } from 'react-redux'
import { fetchItemsRequest } from '../../modules/items/actions'
import { getItems, getError, isLoadingItems, getProfileWearableIds } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Overview from './Overview'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './Overview.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  items: getItems(state),
  isLoading: isLoadingItems(state),
  wearableIds: getProfileWearableIds(state, ownProps.profileAddress),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchItems: (wearableIds: string[]) => dispatch(fetchItemsRequest(wearableIds))
})

export default connect(mapState, mapDispatch)(Overview)
