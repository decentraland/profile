import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { config } from '../../modules/config'
import { Props } from './Navbar.types'
import './Navbar.css'

const AUTH_URL = config.get('AUTH_URL')

const Navbar = (props: Props) => {
  const { isAuthDappEnabled, onClickSignIn } = props

  const handleSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${AUTH_URL}?redirectTo=${window.location.href}`)
    } else if (onClickSignIn) {
      onClickSignIn({} as unknown as React.MouseEvent<HTMLElement, MouseEvent>)
    }
  }, [])

  return <BaseNavbar {...props} onSignIn={handleSignIn} />
}

export default Navbar
