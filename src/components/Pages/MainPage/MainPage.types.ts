import { Profile } from '@dcl/schemas'

export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isCreationsTabEnabled: boolean
  isAssetsTabEnabled: boolean
  isLoadingFeatures: boolean
  isBlocked: boolean
  profile?: Profile
}

export type MapStateProps = Pick<
  Props,
  'loggedInAddress' | 'isBlocked' | 'isLoading' | 'isCreationsTabEnabled' | 'isAssetsTabEnabled' | 'isLoadingFeatures' | 'profile'
>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
