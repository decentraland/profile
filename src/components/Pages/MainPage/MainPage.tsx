import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'
import { Loader } from 'decentraland-ui'
import { locations } from '../../../modules/routing/locations'
import { Avatar } from '../../Avatar'
import { PageLayout } from '../../PageLayout'
import { ProfileInformation } from '../../ProfileInformation'
import { MainPageParams, Props } from './MainPage.types'
import { nullAddress } from './constants'
import styles from './MainPage.module.css'

function MainPage(props: Props) {
  const { isLoading, onFetchProfile, loggedInAddress } = props
  const tabs: { displayValue: string; value: string }[] = [{ displayValue: t('tabs.overview'), value: t('tabs.overview') }]

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value)

  const handleTabChange = useCallback(
    (tab: string) => {
      setSelectedTab(tab)
    },
    [setSelectedTab]
  )
  const navigate = useNavigate()

  const { profileAddress } = useParams<MainPageParams>()

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
        <Loader active />
      ) : (
        <div className={styles.MainPage}>
          {selectedTab === tabs[0].value && <Avatar profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} />}
          <div className={styles.infoContainer}>
            <ProfileInformation profileAddress={profileAddress ?? loggedInAddress ?? nullAddress} loggedInAddress={loggedInAddress} />
            <Divider />
            <Tabs>
              {tabs.map(tab => (
                <Tabs.Tab key={tab.value} active={selectedTab === tab.value} onClick={() => handleTabChange(tab.value)}>
                  <span className={styles.tab}>{tab.displayValue}</span>
                </Tabs.Tab>
              ))}
            </Tabs>
            <div>content</div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default MainPage
