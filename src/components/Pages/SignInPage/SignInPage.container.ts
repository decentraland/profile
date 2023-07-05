import { connect } from 'react-redux'
import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import SignInPage from './SignInPage'
import { MapStateProps } from './SignInPage.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

export default connect(mapState)(SignInPage)
