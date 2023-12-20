import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import UserInformation from 'decentraland-dapps/dist/containers/UserInformation'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui'
import { config } from '../../modules/config'
import { Props } from './Navbar.types'
import './Navbar.css'

const AUTH_URL = config.get('AUTH_URL')

const Navbar = (props: Props) => {
  const { isConnected, isAuthDappEnabled, onSignIn } = props

  const handleSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${AUTH_URL}?redirectTo=${window.location.href}`)
    } else if (onSignIn) {
      onSignIn()
    }
  }, [])

  if (isConnected) {
    props = { ...props, rightMenu: <UserInformation /> }
  } else {
    props = {
      ...props,
      rightMenu: (
        <Button primary onClick={handleSignIn}>
          {t('navbar.sign_in')}
        </Button>
      )
    }
  }

  return <BaseNavbar {...props} activePage="profile" isFullscreen={props.isFullscreen} onSignIn={() => undefined} />
}

export default Navbar
