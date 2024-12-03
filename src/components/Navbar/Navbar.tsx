import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { config } from '../../modules/config'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, search } = useLocation()

  const handleSignIn = useCallback(() => {
    const searchParams = new URLSearchParams(search)
    const currentRedirectTo = searchParams.get('redirectTo')
    const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/profile' : ''
    const redirectTo = !currentRedirectTo ? `${basename}${pathname}${search}` : `${basename}${currentRedirectTo}`

    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${redirectTo}`)
  }, [])

  return <BaseNavbar {...props} onSignIn={handleSignIn} withNotifications />
}

export default Navbar
