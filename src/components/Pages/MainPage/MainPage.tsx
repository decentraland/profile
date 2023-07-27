/* eslint-disable*/
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'
import { NFTCategory, Rarity, BodyShape, Network, CatalogSortBy, Item, WearableCategory } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'
import { AssetCardFilters, AssetCardTranslations, Loader, AssetCard } from 'decentraland-ui'
import { config } from '../../../modules/config'
import { locations } from '../../../modules/routing/locations'
import { Avatar } from '../../Avatar'
import { PageLayout } from '../../PageLayout'
import { ProfileInformation } from '../../ProfileInformation'
import { nullAddress } from './constants'
import { MainPageParams, Props } from './MainPage.types'
import styles from './MainPage.module.css'

const assetMock: Item = {
  id: '0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652-0',
  beneficiary: '0xd4fec88a49eb514e9347ec655d0481d8483a9ae0',
  itemId: '0',
  name: 'SciFiSuit Female',
  thumbnail:
    'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652:0/thumbnail',
  url: '/contracts/0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652/items/0',
  category: NFTCategory.WEARABLE,
  contractAddress: '0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652',
  rarity: Rarity.EPIC,
  available: 5000,
  isOnSale: true,
  creator: '0xd4fec88a49eb514e9347ec655d0481d8483a9ae0',
  data: {
    wearable: {
      description: '',
      category: WearableCategory.UPPER_BODY,
      bodyShapes: [BodyShape.FEMALE],
      rarity: Rarity.EPIC,
      isSmart: false
    }
  },
  network: Network.MATIC,
  chainId: 80001,
  price: '10000000000000000000',
  createdAt: 1690307365,
  updatedAt: 1690307560,
  reviewedAt: 1690307626,
  firstListedAt: 1690307754,
  soldAt: 1689859260,
  minPrice: '2000000000000000000',
  maxListingPrice: '10000000000000000000',
  minListingPrice: '10000000000000000000',
  listings: 2,
  owners: null,
  picks: {
    count: 0,
    pickedByUser: false
  },
  urn: 'urn:decentraland:mumbai:collections-v2:0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652:0/thumbnail'
}

const assetFiltersMock: AssetCardFilters = {
  sortBy: CatalogSortBy.CHEAPEST
}

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

  const translations: AssetCardTranslations = {
    listing: t('asset_card.Listing'),
    listings: t('Listings'),
    available_for_mint: t('Buy directly from creator'),
    available_listings_in_range: t('Available listings in this range'),
    cheapest_listing: t('Cheapest Listing'),
    not_for_sale: t('Not for sale'),
    owner: t('Owner'),
    owners: t('Owners'),
    cheapest_option: t('Cheapest Option'),
    cheapest_option_range: t('Cheapest Option within range'),
    most_expensive: t('Most Expensive'),
    most_expensive_range: t('Most Expensive within range'),
    also_minting: t('Buy directly from the creator')
  }

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
            <div>
              <AssetCard
                translations={translations}
                asset={assetMock}
                assetFilters={assetFiltersMock}
                onClickCardURL={config.get('MARKETPLACE_URL')}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default MainPage
