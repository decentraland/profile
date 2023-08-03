import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getLoading } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { fetchItemsRequest } from '../../modules/items/actions'
import { getItems, getError } from '../../modules/items/selectors'
import { RootState } from '../../modules/reducer'
import Overview from './Overview'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './Overview.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  items: getItems(state),
  isLoading: getLoading(state),
  profile: getProfileOfAddress(state, ownProps.profileAddress),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchItems: (wearableIds: string[]) => dispatch(fetchItemsRequest(wearableIds))
})

export default connect(mapState, mapDispatch)(Overview)
