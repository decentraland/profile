import { connect } from 'react-redux'
import { hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsAssetsTabEnabled, getIsCreationsTabEnabled } from '../../../modules/features/selectors'
import { isLoggingIn } from '../../../modules/identity/selector'
import { hasBlockedLoggedUser, isBlockedByLoggedUser } from '../../../modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
import MainPage from './MainPage'
import { MapStateProps, OwnProps } from './MainPage.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const profileAddress = ownProps.profileAddress

  return {
    profile: profileAddress ? getProfileOfAddress(state, profileAddress) : undefined,
    isLoading: ownProps.isLoading || isLoggingIn(state) || isConnecting(state),
    isCreationsTabEnabled: getIsCreationsTabEnabled(state),
    isAssetsTabEnabled: getIsAssetsTabEnabled(state),
    isLoadingFeatures: !hasLoadedInitialFlags(state),
    loggedInAddress: getAddress(state)?.toLowerCase(),
    isBlocked: !!profileAddress && (isBlockedByLoggedUser(state, profileAddress) || hasBlockedLoggedUser(state, profileAddress))
  }
}

export default connect(mapStateToProps)(MainPage)
