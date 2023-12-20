export type Props = {
  isUserLoggedIn: boolean
  isUserLoggingIn: boolean
  userAddress?: string
  isAuthDappEnabled: boolean
}

export type MapStateProps = Pick<Props, 'isUserLoggedIn' | 'isUserLoggingIn' | 'userAddress' | 'isAuthDappEnabled'>
