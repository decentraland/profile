import { Dispatch } from '@reduxjs/toolkit'
import { UserMenuProps } from 'decentraland-ui/dist/components/UserMenu/UserMenu'
import { ConnectWalletRequestAction, DisconnectWalletAction } from 'decentraland-dapps/dist/modules/wallet/actions'

export type Props = UserMenuProps & { hasTranslations: boolean }

export type MapStateProps = Pick<
  Props,
  'isSignedIn' | 'isSigningIn' | 'address' | 'avatar' | 'manaBalances' | 'hasActivity' | 'hasTranslations'
>
export type MapDispatchProps = Pick<Props, 'onSignOut'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | DisconnectWalletAction>