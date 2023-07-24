import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { getFriendshipStatus, isLoadingFriendRequestEvents, isLoadingFriends } from '../../modules/social/selectors'
import FriendshipButton from './FriendshipButton'
import { MapStateProps, OwnProps } from './FriendshipButton.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: isLoadingFriends(state) || isLoadingFriendRequestEvents(state),
    friendshipStatus: getFriendshipStatus(state, ownProps.friendAddress)
  }
}

export default connect(mapState)(FriendshipButton)
