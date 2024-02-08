import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { isConnected, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { loginRequest } from '../../../modules/identity/action'
import { isLoggedIn } from '../../../modules/identity/selector'
import { RootState } from '../../../modules/reducer'
import SignInPage from './SignInPage'
import { MapStateProps, MapDispatch, MapDispatchProps } from './SignInPage.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state) && isLoggedIn(state),
  isConnecting: isConnecting(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps =>
  bindActionCreators(
    {
      onConnect: loginRequest
    },
    dispatch
  )

export default connect(mapState, mapDispatch)(SignInPage)
