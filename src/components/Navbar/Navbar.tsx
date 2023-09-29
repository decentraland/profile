import React from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui'
import { locations } from '../../modules/routing/locations'
import UserInformation from '../UserInformation'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { isConnected, onSignIn } = props
  const { pathname } = location

  if (isConnected) {
    props = { ...props, rightMenu: <UserInformation /> }
  } else {
    props = {
      ...props,
      rightMenu: (
        <Button primary onClick={onSignIn}>
          {t('navbar.sign_in')}
        </Button>
      )
    }
  }

  return (
    <BaseNavbar
      {...props}
      activePage="profile"
      isFullscreen={props.isFullscreen}
      isSignIn={pathname === locations.signIn()}
      onSignIn={() => undefined}
    />
  )
}

export default Navbar
