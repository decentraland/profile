import React from 'react'
import { Navigate } from 'react-router-dom'
import { locations } from '../../../modules/routing/locations'
import LoadingPage from '../../Pages/LoadingPage'
import { Props } from './ConnectAndRedirect.types'

const ConnectAndRedirect = (props: Props) => {
  const { isUserLoggedIn, isUserLoggingIn, userAddress } = props

  if (isUserLoggingIn) {
    return <LoadingPage />
  } else if (isUserLoggedIn && userAddress) {
    return <Navigate to={locations.account(userAddress)} replace={true} />
  }

  return <Navigate to={locations.signIn(locations.root())} replace={true} />
}

export default ConnectAndRedirect
