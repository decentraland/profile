import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { RootState } from '../../modules/reducer'
import { getFriends, isLoadingFriends } from '../../modules/social/selectors'
import { FriendsType } from '../Modals/FriendsModal'
import FriendsCounter from './FriendsCounter'
import { MapStateProps, MapDispatch, MapDispatchProps } from './FriendsCounter.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isLoadingFriends(state),
    count: getFriends(state).length
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClick: () => dispatch(openModal('FriendsModal', { type: FriendsType.FRIENDS }))
})

export default connect(mapState, mapDispatch)(FriendsCounter)
