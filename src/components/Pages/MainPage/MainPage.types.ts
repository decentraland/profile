export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isLoadingFeatures: boolean
  isLoggedIn: boolean
  isBlocked: boolean
  isReferralEnabled: boolean
}

export type MapStateProps = Pick<
  Props,
  'loggedInAddress' | 'isBlocked' | 'isLoading' | 'isLoadingFeatures' | 'isLoggedIn' | 'isReferralEnabled'
>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
