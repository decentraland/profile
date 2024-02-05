import React from 'react'
import classNames from 'classnames'
import { BackToTopButton } from 'decentraland-dapps/dist/containers/BackToTopButton/BackToTopButton'
import { Footer } from '../Footer'
import Navbar from '../Navbar'
import { Props } from './PageLayout.types'
import styles from './PageLayout.module.css'

const PageLayout = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.page, className)}>
      <Navbar className={styles.navbar} />
      <div className={styles.content}>{children}</div>
      <Footer className={styles.footer} />
      <BackToTopButton />
    </div>
  )
}

export default PageLayout
