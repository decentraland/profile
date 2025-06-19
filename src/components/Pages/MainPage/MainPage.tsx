import React, { useCallback, useMemo, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'
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
import { Referrals } from '../../Referrals'
import LoadingPage from '../LoadingPage'
import { nullAddress } from './constants'
import { Props } from './MainPage.types'
import styles from './MainPage.module.css'

function MainPage(props: Props) {
  const { isLoading, profileAddress, loggedInAddress, isBlocked, isReferralEnabled, isLoggedIn, isLoadingFeatures } = props
  const view = getView(loggedInAddress, profileAddress)
  const isMobile = useMobileMediaQuery()
  const navigate = useNavigate()
  const params = useParams()
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoadingFeatures || isLoading || !profileAddress) {
      return
    }

    if (!isTabValid(params.tab) || (params.tab === AccountTabs.REFERRAL && !isReferralEnabled)) {
      navigate(locations.account(profileAddress ?? nullAddress), { replace: true })
    }
  }, [params.tab, isReferralEnabled, profileAddress, navigate, isLoadingFeatures, isLoading])

  const selectedTab = useMemo(() => {
    return params.tab ?? AccountTabs.OVERVIEW
  }, [params])

  const shouldShowLoadingPage = isLoading && !(selectedTab === AccountTabs.REFERRAL && isLoggedIn) && !(isLoggedIn && !profileAddress)

  const tabs: { displayValue: string; value: AccountTabs }[] = useMemo(
    () => [
      { displayValue: t('tabs.overview'), value: AccountTabs.OVERVIEW },
      { displayValue: view === View.OWN ? t('tabs.own_assets') : t('tabs.others_assets'), value: AccountTabs.ASSETS },
      { displayValue: view === View.OWN ? t('tabs.own_creations') : t('tabs.others_creations'), value: AccountTabs.CREATIONS },
      ...(isReferralEnabled
        ? [{ displayValue: view === View.OWN ? t('tabs.referrals') : t('tabs.referrals'), value: AccountTabs.REFERRAL }]
        : [])
    ],
    [view, isReferralEnabled]
  )

  const handleTabChange = useCallback((tab: AccountTabs) => {
    switch (tab) {
      case AccountTabs.CREATIONS:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.CREATIONS))
        return
      case AccountTabs.ASSETS:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.ASSETS))
        return
      case AccountTabs.REFERRAL:
        navigate(locations.account(profileAddress ?? nullAddress, AccountTabs.REFERRAL))
        return
      case AccountTabs.OVERVIEW:
        navigate(locations.account(profileAddress ?? nullAddress))
        return
    }
  }, [])

  useEffect(() => {
    if (selectedTab === AccountTabs.REFERRAL && tabsRef.current) {
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [selectedTab])

  if (selectedTab === AccountTabs.REFERRAL && isLoggedIn) {
    return (
      <PageLayout>
        <div className={classNames(styles.MainPage, { [styles.extended]: true })}>
          <div
            className={classNames(styles.avatarContainer, {
              [styles.hidden]: true,
              [styles.visible]: isMobile
            })}
          >
            <Avatar view={View.OWN} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
          </div>
          <div className={classNames(styles.infoContainer)}>
            <ProfileInformation profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
            <Divider className={styles.divider} />
            <div ref={tabsRef}>
              <Tabs>
                {tabs.map(tab => {
                  return (
                    <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                      <span className={styles.tab}>{tab.displayValue}</span>
                    </Tabs.Tab>
                  )
                })}
              </Tabs>
            </div>
            <Referrals view={View.OWN} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
          </div>
        </div>
      </PageLayout>
    )
  }

  return shouldShowLoadingPage ? (
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
              <div ref={tabsRef}>
                <Tabs>
                  {tabs.map(tab => {
                    return (
                      <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                        <span className={styles.tab}>{tab.displayValue}</span>
                      </Tabs.Tab>
                    )
                  })}
                </Tabs>
              </div>
              {selectedTab === AccountTabs.ASSETS ? (
                <Assets profileAddress={profileAddress ?? nullAddress} view={view} />
              ) : selectedTab === AccountTabs.CREATIONS ? (
                <Creations profileAddress={profileAddress ?? nullAddress} view={view} />
              ) : selectedTab === AccountTabs.REFERRAL && profileAddress ? (
                <Referrals view={view} profileAddress={profileAddress} />
              ) : (
                <Overview profileAddress={profileAddress ?? nullAddress} />
              )}
            </>
          ) : null}
          {isBlocked && <BlockedUser profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />}
        </div>
      </div>
    </PageLayout>
  )
}

export default MainPage
