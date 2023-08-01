import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { getFriends, isLoadingFriends } from '../../modules/social/selectors'
import FriendsCounter from './FriendsCounter'
import { MapStateProps, MapDispatch, MapDispatchProps } from './FriendsCounter.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isLoadingFriends(state),
    count: getFriends(state).length
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({
  onClick: () => undefined
})

export default connect(mapState, mapDispatch)(FriendsCounter)
