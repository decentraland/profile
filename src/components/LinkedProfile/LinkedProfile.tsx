import React from 'react'
import Profile from 'decentraland-dapps/dist/containers/Profile'
import { locations } from '../../modules/routing/locations'
import { Props } from './LinkedProfile.types'

export const LinkedProfile = <T extends React.ElementType>(props: Props<T>) => {
  const { address, className } = props

  return <Profile {...props} className={className} as="a" href={locations.account(address)} />
}
