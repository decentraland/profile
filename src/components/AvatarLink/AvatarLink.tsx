import React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Popup } from 'decentraland-ui/dist/components/Popup/Popup'
import { getLinkIcon } from './utils'
import { Props } from './AvatarLink.types'
import styles from './AvatarLink.module.css'

const AvatarLink = (props: Props) => {
  const {
    link: { title, url },
    collapsed
  } = props
  const icon = getLinkIcon(url)
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Popup
      content={title}
      position="top center"
      disabled={isTabletAndBelow || !collapsed}
      trigger={
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.AvatarLink}>
          <Icon name={icon} size={collapsed ? 'large' : 'small'} data-testid={icon} />
          {collapsed ? null : <span>{title}</span>}
        </a>
      }
    />
  )
}

export default AvatarLink
