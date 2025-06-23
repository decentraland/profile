export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isLoadingFeatures: boolean
  isBlocked: boolean
  isReferralEnabled: boolean
}

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isBlocked' | 'isLoading' | 'isLoadingFeatures' | 'isReferralEnabled'>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
