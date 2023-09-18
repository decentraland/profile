import React from 'react'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { PageLayout } from '../../PageLayout'
import { LOADING_PAGE_TEST_ID } from './constants'
import styles from './LoadingPage.module.css'

const LoadingPage = () => {
  return (
    <PageLayout>
      <div className={styles.fullPage} data-testid={LOADING_PAGE_TEST_ID}>
        <Loader active />
      </div>
    </PageLayout>
  )
}

export default LoadingPage
