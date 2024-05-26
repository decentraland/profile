import React, { useEffect } from 'react'
import NotFoundPage from '../../Pages/NotFoundPage'
import { Props } from './WithProfile.types'

// eslint-disable-next-line @typescript-eslint/naming-convention
const WithProfile = (props: Props) => {
  const { component: Component, error, isAddress, isLoading, hasLoadedProfile, addressOrName, profileAddress, onFetchProfile } = props

  useEffect(() => {
    if (!isLoading && !hasLoadedProfile && !error) {
      onFetchProfile(addressOrName)
    }
  }, [isLoading, error, hasLoadedProfile])

  if (error && !isAddress && !isLoading) {
    return <NotFoundPage />
  }

  return <Component isLoading={isLoading || (!hasLoadedProfile && !error)} profileAddress={profileAddress} />
}

export default WithProfile
