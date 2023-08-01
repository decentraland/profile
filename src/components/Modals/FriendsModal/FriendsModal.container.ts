import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { getFriends } from '../../../modules/social/selectors'
import FriendsModal from './FriendsModal'
import { FriendsType, MapStateProps, OwnProps } from './FriendsModal.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    friends: ownProps.metadata.type === FriendsType.FRIENDS ? getFriends(state) : []
  }
}

export default connect(mapState)(FriendsModal)
