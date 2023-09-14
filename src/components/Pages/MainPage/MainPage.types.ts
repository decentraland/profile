export type Props = {
  loggedInAddress?: string
  profileAddress?: string
  isLoading?: boolean
  isBlocked: boolean
}

export type MapStateProps = Pick<Props, 'loggedInAddress' | 'isBlocked' | 'isLoading'>
export type OwnProps = Pick<Props, 'profileAddress' | 'isLoading'>
