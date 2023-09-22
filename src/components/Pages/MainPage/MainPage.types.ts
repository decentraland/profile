export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isCreationsTabEnabled: boolean
  isAssetsTabEnabled: boolean
  isBlocked: boolean
}

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isBlocked' | 'isLoading' | 'isCreationsTabEnabled' | 'isAssetsTabEnabled'>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
