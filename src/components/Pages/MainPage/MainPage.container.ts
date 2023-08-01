import { connect } from 'react-redux'
import { loadProfileRequest } from 'decentraland-dapps/dist/modules/profile/actions'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { isLoggingIn } from '../../../modules/identity/selector'
import { isLoadingProfile } from '../../../modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
import withRouter from '../../../utils/WithRouter'
import MainPage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './MainPage.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const addressFromPath = ownProps.router.params.profileAddress
  const isLoadingAddressFromPath = addressFromPath && isLoadingProfile(state, addressFromPath)
  const isLoadingLoggedInUserProfile = getAddress(state) && isLoadingProfile(state, getAddress(state))

  return {
    profileAddress: addressFromPath,
    isLoading: isLoadingAddressFromPath || isLoadingLoggedInUserProfile || isLoggingIn(state) || isConnecting(state),
    loggedInAddress: getAddress(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchProfile: address => dispatch(loadProfileRequest(address))
})

export default withRouter(connect(mapStateToProps, mapDispatch)(MainPage))
