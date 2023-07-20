import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../../modules/reducer'
import Avatar from './Avatar'
import { MapStateProps, OwnProps } from './Avatar.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return { profile: getProfileOfAddress(state, ownProps.profileAddress) }
}

export default connect(mapState)(Avatar)
