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
import { View, getView } from '../../../utils/view'
import { Assets } from '../../Assets'
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
  const { isLoading, profileAddress, loggedInAddress, isBlocked, isCreationsTabEnabled, isAssetsTabEnabled, isLoadingFeatures } = props
  const view = getView(loggedInAddress, profileAddress)
  const isMobile = useMobileMediaQuery()
  const navigate = useNavigate()
  const params = useParams()

  if (
    !isTabValid(params.tab) ||
    (params.tab === AccountTabs.ASSETS && !isAssetsTabEnabled && !isLoadingFeatures) ||
    (params.tab === AccountTabs.CREATIONS && !isCreationsTabEnabled && !isLoadingFeatures)
  ) {
    navigate(locations.account(profileAddress ?? nullAddress), { replace: true })
  }

  const selectedTab = useMemo(() => {
    return params.tab ?? AccountTabs.OVERVIEW
  }, [params])

  const tabs: { displayValue: string; value: AccountTabs }[] = useMemo(
    () => [
      { displayValue: t('tabs.overview'), value: AccountTabs.OVERVIEW },
      ...(isAssetsTabEnabled
        ? [{ displayValue: view === View.OWN ? t('tabs.own_assets') : t('tabs.others_assets'), value: AccountTabs.ASSETS }]
        : []),
      ...(isCreationsTabEnabled
        ? [{ displayValue: view === View.OWN ? t('tabs.own_creations') : t('tabs.own_creations'), value: AccountTabs.CREATIONS }]
        : [])
    ],
    [isAssetsTabEnabled, isCreationsTabEnabled]
  )

  const handleTabChange = useCallback((tab: AccountTabs) => {
    switch (tab) {
      case AccountTabs.CREATIONS:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.CREATIONS))
        return
      case AccountTabs.ASSETS:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.ASSETS))
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
      case AccountTabs.ASSETS:
        return <Assets profileAddress={profileAddress ?? nullAddress} view={view} />
      default:
        return <Overview loggedInAddress={loggedInAddress} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
    }
  }, [selectedTab, view])

  usePageTracking()

  return isLoading ? (
    <LoadingPage />
  ) : (
    <PageLayout>
      <div className={classNames(styles.MainPage, { [styles.extended]: selectedTab !== AccountTabs.OVERVIEW })}>
        <div
          className={classNames(styles.avatarContainer, {
            [styles.hidden]: selectedTab !== AccountTabs.OVERVIEW,
            [styles.visible]: selectedTab === AccountTabs.OVERVIEW || isMobile
          })}
        >
          <Avatar view={view} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
        </div>
        <div className={classNames(styles.infoContainer)}>
          <ProfileInformation profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
          <Divider className={styles.divider} />
          {!isBlocked ? (
            <>
              {isCreationsTabEnabled || isAssetsTabEnabled ? (
                <Tabs>
                  {tabs.map(tab => {
                    return (
                      <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                        <span className={styles.tab}>{tab.displayValue}</span>
                      </Tabs.Tab>
                    )
                  })}
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
