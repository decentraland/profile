import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { RootState } from '../../modules/reducer'
import { fetchMutualFriendsRequest } from '../../modules/social/actions'
import { getMutualFriends, isLoadingMutualFriends } from '../../modules/social/selectors'
import { FriendsType } from '../Modals/FriendsModal'
import MutualFriendsCounter from './MutualFriendsCounter'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './MutualFriendsCounter.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isLoadingMutualFriends(state),
    count: getMutualFriends(state).length,
    firstMutuals: getMutualFriends(state).slice(0, 3)
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps): MapDispatchProps => ({
  onClick: () => dispatch(openModal('FriendsModal', { type: FriendsType.MUTUALS })),
  onFetchMutualFriends: () => dispatch(fetchMutualFriendsRequest(ownProps.friendAddress))
})

export default connect(mapState, mapDispatch)(MutualFriendsCounter)
