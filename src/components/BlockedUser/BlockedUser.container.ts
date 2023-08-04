import { connect } from 'react-redux'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { isBlockedByLoggedUser } from '../../modules/profile/selectors'
import { RootState } from '../../modules/reducer'
import BlockedUser from './BlockedUser'
import { MapStateProps, OwnProps } from './BlockedUser.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => ({
  profile: getProfileOfAddress(state, ownProps.profileAddress),
  isBlockedByLoggedUser: isBlockedByLoggedUser(state, ownProps.profileAddress)
})

export default connect(mapState)(BlockedUser)
