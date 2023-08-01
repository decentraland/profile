import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { getFriends } from '../../../modules/social/selectors'
import FriendsModal from './FriendsModal'
import { MapStateProps } from './FriendsModal.types'

const friends = [
  '0xACA5bC79b0cD51b726D2EAdfC747F7AD4dfe7EfB',
  '0x7DbBDF7C7c4c4d408cd43660D9a1f86B53109F5f',
  '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
  '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe3',
  '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe2',
  '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe1',
  '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe0'
]

const mapState = (state: RootState): MapStateProps => {
  getFriends(state)
  return {
    friends
  }
}

export default connect(mapState)(FriendsModal)
