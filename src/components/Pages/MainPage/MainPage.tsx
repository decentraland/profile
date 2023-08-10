import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { locations } from '../../../modules/routing/locations'
import { getView } from '../../../utils/view'
import { Avatar } from '../../Avatar'
import { BlockedUser } from '../../BlockedUser'
import Overview from '../../Overview'
import { PageLayout } from '../../PageLayout'
import { ProfileInformation } from '../../ProfileInformation'
import { nullAddress } from './constants'
import { Props } from './MainPage.types'
import styles from './MainPage.module.css'

function MainPage(props: Props) {
  const { isLoading, profileAddress, loggedInAddress, isBlocked, onFetchProfile } = props
  const view = getView(loggedInAddress, profileAddress)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  //  TODO: use this on tabs implementation
  // const tabs: { displayValue: string; value: string }[] = [{ displayValue: t('tabs.overview'), value: t('tabs.overview') }]
  // const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value)
  // const handleTabChange = useCallback(
  //   (tab: string) => {
  //     setSelectedTab(tab)
  //   },
  //   [setSelectedTab]
  // )

  const navigate = useNavigate()

  useEffect(() => {
    if (profileAddress) {
      onFetchProfile(profileAddress)
    }
  }, [profileAddress])

  useEffect(() => {
    if (!profileAddress && !loggedInAddress && !isLoading) {
      navigate(locations.signIn(locations.root()))
    }
  }, [isLoading, loggedInAddress, profileAddress])

  return (
    <PageLayout>
      {isLoading ? (
        <div className={styles.fullPage}>
          <Loader active />
        </div>
      ) : (
        <div className={classNames(styles.MainPage, isTabletAndBelow && styles.MainPageMobile)}>
          {/* TODO: use this on tabs implementation
          {selectedTab === tabs[0].value && <Avatar view={view} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />} */}
          <Avatar view={view} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
          <div className={classNames(styles.infoContainer, isTabletAndBelow && styles.infoContainerMobile)}>
            <ProfileInformation profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
            <Divider className={styles.divider} />
            {!isBlocked && (
              <>
                {/* <Tabs>
                  {tabs.map(tab => (
                    <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                      <span className={styles.tab}>{tab.displayValue}</span>
                    </Tabs.Tab>
                  ))}
                </Tabs> */}
                <Overview loggedInAddress={loggedInAddress} profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />
              </>
            )}
            {isBlocked && (
              <BlockedUser profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default MainPage
