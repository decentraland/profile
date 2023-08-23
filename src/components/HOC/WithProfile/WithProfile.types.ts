import { ComponentProps } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { EnhancedFetchProfileRequestAction } from '../../../modules/profile/action'
import { RouterProps } from '../WithRouter/WithRouter'

export type Props = {
  profileAddress?: string
  addressOrName: string
  error: string | null
  isLoading: boolean
  hasLoadedProfile: boolean
  isAddress: boolean
  component: React.FunctionComponent<ComponentProps<any>>
  router: RouterProps<Params>
  onFetchProfile: (nameOrAddress: string) => void
}
type Params = {
  profileAddress?: string
}

export type OwnProps = Pick<Props, 'component' | 'router'>
export type MapStateProps = Pick<Props, 'profileAddress' | 'addressOrName' | 'error' | 'isLoading' | 'hasLoadedProfile' | 'isAddress'>
export type MapDispatch = Dispatch<EnhancedFetchProfileRequestAction>
export type MapDispatchProps = Pick<Props, 'onFetchProfile'>
