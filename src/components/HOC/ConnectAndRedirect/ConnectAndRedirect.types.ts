export type Props = {
  isUserLoggedIn: boolean
  isUserLoggingIn: boolean
  userAddress?: string
}

export type MapStateProps = Pick<Props, 'isUserLoggedIn' | 'isUserLoggingIn' | 'userAddress'>
