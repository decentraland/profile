import * as React from 'react'
import { T } from 'decentraland-dapps/dist/modules/translation/utils'
import { UserMenu as UserMenuComponent, UserMenuI18N } from 'decentraland-ui/dist/components/UserMenu/UserMenu'

export default class UserMenu extends React.Component<any> {
  getTranslations = (): UserMenuI18N | undefined => {
    if (!this.props.hasTranslations) {
      return undefined
    }
    return {
      signIn: <T id="@dapps.user_menu.sign_in" />,
      signOut: <T id="@dapps.user_menu.sign_out" />,
      guest: <T id="@dapps.user_menu.guest" />,
      settings: <T id="@dapps.user_menu.settings" />,
      account: <T id="@dapps.user_menu.account" />
    }
  }

  render() {
    return <UserMenuComponent {...this.props} i18n={this.getTranslations()} />
  }
}
