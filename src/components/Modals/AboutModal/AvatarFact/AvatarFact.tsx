import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Icon } from 'decentraland-ui'
import { AvatarFacts } from '../../../../modules/profile/types'
import { camelToSnakeCase, formatFact, getFactIcon } from './utils'
import { Props } from './AvatarFact.types'
import styles from './AvatarFact.module.css'

const AvatarFact = (props: Props) => {
  const { title, value } = props
  const key = title as keyof AvatarFacts
  const icon = getFactIcon(key)

  return (
    <div className={styles.AvatarFact}>
      <div className={styles.label}>
        {icon ? <Icon name={icon} data-testid={icon} /> : null}
        {t(`about_modal.${camelToSnakeCase(key)}_label`)}
      </div>
      <div className={styles.value}>{formatFact(key, value)}</div>
    </div>
  )
}

export default AvatarFact
