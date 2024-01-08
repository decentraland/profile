import { connect } from 'react-redux'
import { ProviderType } from '@dcl/schemas'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getPendingTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { getAddress, isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsAuthDappEnabled, getIsNavbarV2Enabled } from '../../modules/features/selectors'
import { loginRequest } from '../../modules/identity/action'
import { RootState } from '../../modules/reducer'
import Navbar from './Navbar'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Navbar.types'

const mapState = (state: RootState): MapStateProps => {
  const address = getAddress(state)
  return {
    hasActivity: address ? getPendingTransactions(state, address).length > 0 : false,
    isConnected: isConnected(state),
    isAuthDappEnabled: getIsAuthDappEnabled(state),
    isNavbarV2Enabled: getIsNavbarV2Enabled(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(openModal('LoginModal', { onConnect: (provider: ProviderType) => dispatch(loginRequest(provider)) }))
})

export default connect(mapState, mapDispatch)(Navbar)
