import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { getFriends } from '../../../modules/social/selectors'
import FriendsModal from './FriendsModal'
import { MapStateProps } from './FriendsModal.types'

const mapState = (state: RootState): MapStateProps => {
  getFriends(state)
  return {
    friends: [
      '0xACA5bC79b0cD51b726D2EAdfC747F7AD4dfe7EfB',
      '0xeDaE96F7739aF8A7fB16E2a888C1E578E1328299',
      '0x7DbBDF7C7c4c4d408cd43660D9a1f86B53109F5f'
    ]
  }
}

export default connect(mapState)(FriendsModal)
