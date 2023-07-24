import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { LOAD_PROFILE_REQUEST, loadProfileRequest } from 'decentraland-dapps/dist/modules/profile/actions'
import { getLoading as isLoadingProfile } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import MainPage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './MainPage.types'

const mapStateToProps = (state: RootState): MapStateProps => {
  return {
    isLoading: isLoadingType(isLoadingProfile(state), LOAD_PROFILE_REQUEST) || isConnecting(state),
    loggedInAddress: getAddress(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchProfile: address => dispatch(loadProfileRequest(address))
})

export default connect(mapStateToProps, mapDispatch)(MainPage)
