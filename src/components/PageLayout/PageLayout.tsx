import React from 'react'
import classNames from 'classnames'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Footer } from '../Footer'
import Navbar from '../Navbar'
import { Props } from './PageLayout.types'
import styles from './PageLayout.module.css'

const PageLayout = ({ children, className }: Props) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <div className={classNames(styles.page, className, isTabletAndBelow && styles.pageMobile)}>
      <Navbar className={styles.navbar} isFullscreen />
      <div className={classNames(styles.content, isTabletAndBelow && styles.contentMobile)}>{children}</div>
      <Footer className={styles.footer} />
    </div>
  )
}

export default PageLayout
