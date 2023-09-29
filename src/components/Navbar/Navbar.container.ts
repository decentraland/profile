import { connect } from 'react-redux'
import { ProviderType } from '@dcl/schemas'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { loginRequest } from '../../modules/identity/action'
import { RootState } from '../../modules/reducer'
import Navbar from './Navbar'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Navbar.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSignIn: () => dispatch(openModal('LoginModal', { onConnect: (provider: ProviderType) => dispatch(loginRequest(provider)) }))
})

export default connect(mapState, mapDispatch)(Navbar)
