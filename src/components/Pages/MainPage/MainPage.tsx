import { useCallback, useState } from 'react'
import { Divider } from 'decentraland-ui'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { PageLayout } from '../../PageLayout'
import { ProfileInformation } from '../../ProfileInformation'
import { Avatar } from '../../Avatar'
import styles from './MainPage.module.css'

function MainPage() {
  const tabs: { displayValue: string; value: string }[] = [{ displayValue: t('tabs.overview'), value: t('tabs.overview') }]

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value)

  const handleTabChange = useCallback(
    (tab: string) => {
      setSelectedTab(tab)
    },
    [setSelectedTab]
  )

  return (
    <PageLayout>
      <div className={styles.MainPage}>
        {selectedTab === tabs[0].value && <Avatar />}
        <div className={styles.infoContainer}>
          <ProfileInformation />
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
    </PageLayout>
  )
}

export default MainPage
