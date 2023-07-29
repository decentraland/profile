import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { fetchFriendsRequest, fetchFriendRequestsEventsRequest, cancelFriendshipRequestRequest } from '../../modules/social/actions'
import {
  getFriendshipStatus,
  isCancellingFriendshipRequest,
  isInitializingSocialClient,
  isLoadingFriendRequestEvents,
  isLoadingFriends
} from '../../modules/social/selectors'
import FriendshipButton from './FriendshipButton'
import { MapStateProps, MapDispatch, MapDispatchProps, OwnProps } from './FriendshipButton.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading:
      isLoadingFriends(state) ||
      isLoadingFriendRequestEvents(state) ||
      isInitializingSocialClient(state) ||
      isCancellingFriendshipRequest(state, ownProps.friendAddress),
    friendshipStatus: getFriendshipStatus(state, ownProps.friendAddress)
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps): MapDispatchProps => ({
  onFetchFriends: () => {
    dispatch(fetchFriendsRequest())
    dispatch(fetchFriendRequestsEventsRequest())
  },
  onAcceptFriendRequest: () => undefined,
  onCancelFriendRequest: () => dispatch(cancelFriendshipRequestRequest(ownProps.friendAddress)),
  onRemoveFriend: () => undefined,
  onAddFriend: () => undefined
})

export default connect(mapState, mapDispatch)(FriendshipButton)
