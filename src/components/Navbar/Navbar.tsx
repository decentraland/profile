import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar as BaseNavbar } from 'decentraland-ui/dist/components/Navbar/Navbar'
import UserMenu from '../UserMenu'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { isConnected } = props
  const { pathname, search } = location
  const navigate = useNavigate()

  if (isConnected) {
    props = { ...props, rightMenu: <UserMenu /> }
  }

  const handleOnSignIn = useCallback(() => {
    // const searchParams = new URLSearchParams(search)
    // const currentRedirectTo = searchParams.get('redirectTo')
    // const redirectTo = !currentRedirectTo
    //   ? `${pathname}${search}`
    //   : currentRedirectTo
    navigate('locations.signIn(redirectTo)')
  }, [pathname, search])

  const handleOnClickAccount = useCallback(() => {
    navigate('locations.settings()')
  }, [navigate])

  return (
    <BaseNavbar
      {...props}
      activePage="marketplace"
      isFullscreen={props.isFullscreen}
      // isSignIn={"pathname === locations.signIn()"}
      onSignIn={handleOnSignIn}
      onClickAccount={handleOnClickAccount}
    />
  )
}

export default Navbar
