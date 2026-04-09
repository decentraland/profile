import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar2 as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { config } from '../../modules/config'
import { Props } from './Navbar.types'

const Navbar = ({ identity }: Props) => {
  const { pathname, search } = useLocation()

  const handleSignIn = useCallback(() => {
    const searchParams = new URLSearchParams(search)
    const currentRedirectTo = searchParams.get('redirectTo')
    const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/profile' : ''
    const redirectTo = !currentRedirectTo ? `${basename}${pathname}${search}` : `${basename}${currentRedirectTo}`

    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${redirectTo}`)
  }, [])

  return <BaseNavbar identity={identity} withNotifications onSignIn={handleSignIn} />
}

export { Navbar }
