import { connect } from 'react-redux'
import { ProviderType } from '@dcl/schemas'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getIsAuthDappEnabled } from '../../modules/features/selectors'
import { loginRequest } from '../../modules/identity/action'
import { RootState } from '../../modules/reducer'
import {
  removeFriendRequest,
  acceptFriendshipRequest,
  requestFriendshipRequest,
  cancelFriendshipRequestRequest,
  logInAndRequestFriendshipRequest
} from '../../modules/social/actions'
import {
  getFriendshipStatus,
  isAcceptingFriendRequest,
  isInitializingSocialClient,
  isLoadingFriendRequestEvents,
  isCancellingFriendshipRequest,
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
      isCancellingFriendshipRequest(state, ownProps.friendAddress) ||
      isRequestingFriendship(state, ownProps.friendAddress) ||
      isRemovingFriend(state, ownProps.friendAddress) ||
      isAcceptingFriendRequest(state, ownProps.friendAddress),
    friendshipStatus: getFriendshipStatus(state, ownProps.friendAddress),
    profile: getProfileOfAddress(state, ownProps.friendAddress),
    isAuthDappEnabled: getIsAuthDappEnabled(state)
  }
}

const mapDispatch = (dispatch: MapDispatch, ownProps: OwnProps): MapDispatchProps => ({
  onCancelFriendRequest: () => dispatch(cancelFriendshipRequestRequest(ownProps.friendAddress)),
  onRemoveFriend: () => dispatch(removeFriendRequest(ownProps.friendAddress)),
  onAddFriend: () => {
    if (ownProps.isLoggedIn) {
      dispatch(requestFriendshipRequest(ownProps.friendAddress))
    } else {
      dispatch(
        logInAndRequestFriendshipRequest({
          friendAddress: ownProps.friendAddress,
          onLogIn: (provider: ProviderType) => dispatch(loginRequest(provider))
        })
      )
    }
  },
  onAcceptFriendRequest: () => dispatch(acceptFriendshipRequest(ownProps.friendAddress))
})

export default connect(mapState, mapDispatch)(FriendshipButton)
