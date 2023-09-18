import { Dispatch } from '@reduxjs/toolkit'
import { ConnectWalletRequestAction, DisconnectWalletAction } from 'decentraland-dapps/dist/modules/wallet/actions'
import { UserInformationComponentProps } from 'decentraland-ui/dist/components/UserInformationContainer/UserInformationContainer'

export type Props = UserInformationComponentProps & { hasTranslations: boolean }

export type MapStateProps = Pick<
  Props,
  'isSignedIn' | 'isSigningIn' | 'address' | 'avatar' | 'manaBalances' | 'hasActivity' | 'hasTranslations'
>
export type MapDispatchProps = Pick<Props, 'onSignOut'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | DisconnectWalletAction>
