import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import {
  fetchFriendsRequest,
  fetchFriendRequestsEventsRequest,
  removeFriendRequest,
  requestFriendshipRequest
} from '../../modules/social/actions'
import {
  getFriendshipStatus,
  isInitializingSocialClient,
  isLoadingFriendRequestEvents,
  isLoadingFriends
} from '../../modules/social/selectors'
import FriendshipButton from './FriendshipButton'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './FriendshipButton.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: isLoadingFriends(state) || isLoadingFriendRequestEvents(state) || isInitializingSocialClient(state),
    friendshipStatus: getFriendshipStatus(state, ownProps.friendAddress)
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps): MapDispatchProps => ({
  onFetchFriends: () => {
    dispatch(fetchFriendsRequest())
    dispatch(fetchFriendRequestsEventsRequest())
  },
  onAcceptFriendRequest: () => undefined,
  onCancelFriendRequest: () => undefined,
  onRemoveFriend: () => dispatch(removeFriendRequest(ownProps.friendAddress)),
  onAddFriend: () => dispatch(requestFriendshipRequest(ownProps.friendAddress))
})

export default connect(mapState, mapDispatch)(FriendshipButton)
