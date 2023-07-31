import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import {
  fetchFriendsRequest,
  fetchFriendRequestsEventsRequest,
  removeFriendRequest,
  acceptFriendshipRequest,
  requestFriendshipRequest
} from '../../modules/social/actions'
import {
  getFriendshipStatus,
  isAcceptingFriendRequest,
  isInitializingSocialClient,
  isLoadingFriendRequestEvents,
  isLoadingFriends,
  isRemovingFriend,
  isRequestingFriendship
} from '../../modules/social/selectors'
import FriendshipButton from './FriendshipButton'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './FriendshipButton.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading:
      isLoadingFriends(state) ||
      isLoadingFriendRequestEvents(state) ||
      isInitializingSocialClient(state) ||
      isRequestingFriendship(state, ownProps.friendAddress) ||
      isRemovingFriend(state, ownProps.friendAddress) ||
      isAcceptingFriendRequest(state, ownProps.friendAddress),
    friendshipStatus: getFriendshipStatus(state, ownProps.friendAddress)
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps): MapDispatchProps => ({
  onFetchFriends: () => {
    dispatch(fetchFriendsRequest())
    dispatch(fetchFriendRequestsEventsRequest())
  },
  onCancelFriendRequest: () => undefined,
  onRemoveFriend: () => dispatch(removeFriendRequest(ownProps.friendAddress)),
  onAddFriend: () => dispatch(requestFriendshipRequest(ownProps.friendAddress)),
  onAcceptFriendRequest: () => dispatch(acceptFriendshipRequest(ownProps.friendAddress))
})

export default connect(mapState, mapDispatch)(FriendshipButton)
