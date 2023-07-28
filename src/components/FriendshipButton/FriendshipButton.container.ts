import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { fetchFriendsRequest, fetchFriendRequestsEventsRequest, acceptFriendshipRequest } from '../../modules/social/actions'
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
  onCancelFriendRequest: () => undefined,
  onRemoveFriend: () => undefined,
  onAddFriend: () => undefined,
  onAcceptFriendRequest: () => dispatch(acceptFriendshipRequest(ownProps.friendAddress))
})

export default connect(mapState, mapDispatch)(FriendshipButton)
