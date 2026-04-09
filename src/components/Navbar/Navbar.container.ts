import { connect } from 'react-redux'
import { getCurrentIdentity } from '../../modules/identity/selector'
import { RootState } from '../../modules/reducer'
import { Navbar } from './Navbar'
import { MapStateProps } from './Navbar.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    identity: getCurrentIdentity(state) || undefined
  }
}

const ConnectedNavbar = connect(mapState)(Navbar)

export { ConnectedNavbar as Navbar }
