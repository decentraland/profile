import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { config } from '../../modules/config'
import { Props } from './Navbar.types'
import './Navbar.css'

const AUTH_URL = config.get('AUTH_URL')

const Navbar = (props: Props) => {
  const { isAuthDappEnabled, onSignIn } = props

  const handleSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${AUTH_URL}?redirectTo=${window.location.href}`)
    } else if (onSignIn) {
      onSignIn()
    }
  }, [])

  return <BaseNavbar {...props} onSignIn={handleSignIn} />
}

export default Navbar
