import React, { useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'
import usePageTracking from '../../../hooks/usePageTracking'
import { isTabValid, locations } from '../../../modules/routing/locations'
import { AccountTabs } from '../../../modules/routing/types'
import { getView } from '../../../utils/view'
import { Avatar } from '../../Avatar'
import { BlockedUser } from '../../BlockedUser'
import { Creations } from '../../Creations'
import Overview from '../../Overview'
import { PageLayout } from '../../PageLayout'
import { ProfileInformation } from '../../ProfileInformation'
import LoadingPage from '../LoadingPage'
import { nullAddress } from './constants'
import { Props } from './MainPage.types'
import styles from './MainPage.module.css'

function MainPage(props: Props) {
  const { isLoading, profileAddress, loggedInAddress, isBlocked, isCreationsTabEnabled } = props
  const view = getView(loggedInAddress, profileAddress)
  const isMobile = useMobileMediaQuery()
  const navigate = useNavigate()
  const params = useParams()

  if (!isTabValid(params.tab)) {
    navigate(locations.account(profileAddress ?? nullAddress), { replace: true })
  }

  const selectedTab = useMemo(() => {
    const tab = params.tab
    switch (tab) {
      case AccountTabs.CREATIONS:
        return AccountTabs.CREATIONS
      default:
        return AccountTabs.OVERVIEW
    }
  }, [params])

  const tabs: { displayValue: string; value: AccountTabs }[] = useMemo(
    () => [
      { displayValue: t('tabs.overview'), value: AccountTabs.OVERVIEW },
      { displayValue: 'Creations', value: AccountTabs.CREATIONS }
    ],
    []
  )

  const handleTabChange = useCallback((tab: AccountTabs) => {
    switch (tab) {
      case AccountTabs.CREATIONS:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.CREATIONS))
        return
      case AccountTabs.OVERVIEW:
        navigate(locations.account(profileAddress ?? nullAddress))
        return
    }
  }, [])

  const renderTab = useCallback(() => {
    switch (selectedTab) {
      case AccountTabs.CREATIONS:
        return <Creations profileAddress={profileAddress ?? nullAddress} view={view} />
      default:
        return <Overview loggedInAddress={loggedInAddress} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
    }
  }, [selectedTab])

  usePageTracking()

  return isLoading ? (
    <LoadingPage />
  ) : (
    <PageLayout>
      <div className={classNames(styles.MainPage)}>
        {selectedTab === AccountTabs.OVERVIEW || isMobile ? (
          <div className={classNames(styles.avatarContainer)}>
            <Avatar view={view} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
          </div>
        ) : null}
        <div className={classNames(styles.infoContainer)}>
          <ProfileInformation profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
          <Divider className={styles.divider} />
          {!isBlocked ? (
            <>
              {isCreationsTabEnabled ? (
                <Tabs>
                  {tabs.map(tab => (
                    <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                      <span className={styles.tab}>{tab.displayValue}</span>
                    </Tabs.Tab>
                  ))}
                </Tabs>
              ) : null}
              {renderTab()}
            </>
          ) : null}
          {isBlocked && <BlockedUser profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />}
        </div>
      </div>
    </PageLayout>
  )
}

export default MainPage
