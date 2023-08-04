import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { Avatar } from '../../modules/profile/types'
import { RootState } from '../../modules/reducer'
import { isSocialClientInitialized } from '../../modules/social/selectors'
import ProfileInformation from './ProfileInformation'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './ProfileInformation.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  profile: getProfileOfAddress(state, ownProps.profileAddress),
  isSocialClientReady: isSocialClientInitialized(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onViewMore: (avatar: Avatar) => dispatch(openModal('AboutModal', { avatar }))
})

export default connect(mapState, mapDispatch)(ProfileInformation)
