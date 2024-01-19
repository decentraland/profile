import { connect } from 'react-redux'
import { hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { isLoggingIn } from '../../../modules/identity/selector'
import { hasBlockedLoggedUser, isBlockedByLoggedUser } from '../../../modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
import MainPage from './MainPage'
import { MapStateProps, OwnProps } from './MainPage.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const profileAddress = ownProps.profileAddress

  return {
    isLoading: ownProps.isLoading || isLoggingIn(state) || isConnecting(state),
    isLoadingFeatures: !hasLoadedInitialFlags(state),
    loggedInAddress: getAddress(state)?.toLowerCase(),
    isBlocked: !!profileAddress && (isBlockedByLoggedUser(state, profileAddress) || hasBlockedLoggedUser(state, profileAddress))
  }
}

export default connect(mapStateToProps)(MainPage)
