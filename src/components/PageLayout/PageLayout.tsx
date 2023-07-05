import classNames from 'classnames'
import { Footer } from '../Footer'
import styles from './PageLayout.module.css'
import Navbar from '../Navbar'
import { Props } from './PageLayout.types'

const PageLayout = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.page, className)}>
      <Navbar className={styles.navbar} isFullscreen />
      <div className={styles.content}>{children}</div>
      <Footer className={styles.footer} />
    </div>
  )
}

export default PageLayout
