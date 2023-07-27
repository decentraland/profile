import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../../modules/reducer'
import { isSocialClientInitialized } from '../../modules/social/selectors'
import ProfileInformation from './ProfileInformation'
import { MapStateProps, OwnProps } from './ProfileInformation.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  profile: getProfileOfAddress(state, ownProps.profileAddress),
  isSocialClientReady: isSocialClientInitialized(state)
})

export default connect(mapState)(ProfileInformation)
