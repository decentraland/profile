import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { fetchItemsByUrnRequest } from '../../modules/items/actions'
import { getItems, getError, isLoadingItems, getProfileWearableUrns } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Overview from './Overview'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './Overview.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  items: getItems(state),
  isLoading: isLoadingItems(state),
  wearableIds: getProfileWearableUrns(state, ownProps.profileAddress),
  error: getError(state),
  profile: getProfileOfAddress(state, ownProps.profileAddress)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchItems: (wearableIds: string[]) => dispatch(fetchItemsByUrnRequest(wearableIds))
})

export default connect(mapState, mapDispatch)(Overview)
