import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../../modules/reducer'
import ProfileInformation from './ProfileInformation'
import { MapStateProps, OwnProps } from './ProfileInformation.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return { profile: getProfileOfAddress(state, ownProps.profileAddress ?? '') }
}

export default connect(mapState)(ProfileInformation)
