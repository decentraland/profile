export const locations = {
  root: () => '/',
  account: (address: string) => `/${address}`,
  signIn: (redirectTo?: string) => {
    return `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
  }
}
