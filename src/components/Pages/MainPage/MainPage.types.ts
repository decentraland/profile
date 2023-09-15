export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isCreationsTabEnabled: boolean
  isBlocked: boolean
}

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isBlocked' | 'isLoading' | 'isCreationsTabEnabled'>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
