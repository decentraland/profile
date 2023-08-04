import React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './BlockedUser.types'
import styles from './BlockedUser.module.css'

const BlockedUser = (props: Props) => {
  const { profile, isBlockedByLoggedUser } = props
  const avatar = profile?.avatars[0]

  return (
    <div className={styles.Blocked}>
      <Icon size="massive" name="ban" data-testid="ban" />
      <span className={styles.title}>
        {t(`blocked.${isBlockedByLoggedUser ? 'blocked_profile_title' : 'blocked_logged_user_title'}`, {
          name: avatar?.name
        })}
      </span>
      <p className={styles.description}>{t('blocked.description')}</p>
    </div>
  )
}

export default BlockedUser
