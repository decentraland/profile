import { connect } from 'react-redux'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsAuthDappEnabled } from '../../../modules/features/selectors'
import { isLoggedIn, isLoggingIn } from '../../../modules/identity/selector'
import { RootState } from '../../../modules/reducer'
import ConnectAndRedirect from './ConnectAndRedirect'
import { MapStateProps } from './ConnectAndRedirect.types'

const mapStateToProps = (state: RootState): MapStateProps => {
  return {
    isUserLoggedIn: isLoggedIn(state),
    isUserLoggingIn: isLoggingIn(state) || isConnecting(state),
    userAddress: getAddress(state),
    isAuthDappEnabled: getIsAuthDappEnabled(state)
  }
}

export default connect(mapStateToProps)(ConnectAndRedirect)
