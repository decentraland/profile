import { connect } from 'react-redux'
import { hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsReferralEnabled } from '../../../modules/features/selectors'
import { isLoggingIn, isLoggedIn } from '../../../modules/identity/selector'
import { hasBlockedLoggedUser, isBlockedByLoggedUser } from '../../../modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
import MainPage from './MainPage'
import { MapStateProps, OwnProps } from './MainPage.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const profileAddress = ownProps.profileAddress
  const loggedInAddress = getAddress(state)?.toLowerCase()
  const isOwnProfile = !!(loggedInAddress && profileAddress && loggedInAddress === profileAddress.toLowerCase())
  const hasLoadedFlags = hasLoadedInitialFlags(state)
  const referralEnabled = getIsReferralEnabled(state)
  const loggedIn = isLoggedIn(state)

  return {
    isLoading: ownProps.isLoading || isLoggingIn(state) || isConnecting(state),
    isLoadingFeatures: !hasLoadedFlags,
    loggedInAddress,
    isLoggedIn: loggedIn,
    isBlocked: !!profileAddress && (isBlockedByLoggedUser(state, profileAddress) || hasBlockedLoggedUser(state, profileAddress)),
    isReferralEnabled: (referralEnabled && isOwnProfile) || loggedIn
  }
}

export default connect(mapStateToProps)(MainPage)
