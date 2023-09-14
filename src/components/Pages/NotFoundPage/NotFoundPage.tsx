import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import NotFound from '../../../assets/images/NotFound.webp'
import { PageLayout } from '../../PageLayout'
import { NOT_FOUND_PAGE_DATA_TEST_ID } from './constants'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <PageLayout className={styles.layout}>
      <div className={styles.content} data-testid={NOT_FOUND_PAGE_DATA_TEST_ID}>
        <div className={styles.notFound}>
          <img src={NotFound} />
          <div className={styles.title}>
            {t('not_found_page.title', {
              br: () => <br />
            })}
          </div>
          <div className={styles.message}>{t('not_found_page.message')}</div>
        </div>
      </div>
    </PageLayout>
  )
}

export default NotFoundPage
