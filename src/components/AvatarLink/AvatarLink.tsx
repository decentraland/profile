import React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { getLinkIcon } from './utils'
import { Props } from './AvatarLink.types'
import styles from './AvatarLink.module.css'

const AvatarLink = (props: Props) => {
  const {
    link: { title, url },
    collapsed
  } = props
  const icon = getLinkIcon(url)

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.AvatarLink}>
      <Icon name={icon} size={collapsed ? 'large' : 'small'} data-testid={icon} />
      {collapsed ? null : <span>{title}</span>}
    </a>
  )
}

export default AvatarLink
