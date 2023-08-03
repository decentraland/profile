import React from 'react'
import { NFTCategory, Rarity, WearableCategory, BodyShape, Network, Item } from '@dcl/schemas'
import { AssetCardTranslations, AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../modules/config'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = () => {
  const translations: AssetCardTranslations = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    listing: t('asset_card.listing'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    listings: t('asset_card.listings'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    available_for_mint: t('asset_card.available_for_mint'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    available_listings_in_range: t('asset_card.available_listings_in_range'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cheapest_listing: t('asset_card.cheapest_listing'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    not_for_sale: t('asset_card.not_for_sale'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    owner: t('asset_card.owner'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    owners: t('asset_card.owners'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cheapest_option: t('asset_card.cheapest_option'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cheapest_option_range: t('asset_card.cheapest_option_range'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    most_expensive: t('asset_card.most_expensive'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    most_expensive_range: t('asset_card.most_expensive_range'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    also_minting: t('asset_card.also_minting')
  }

  const asset: Item = {
    id: '0x7dce3d0341fea8a9321ca7280cd2bd8948dc3acf-0',
    beneficiary: '0xf14fc98975d16bd8b629ac6ee30811d59d1646f2',
    itemId: '0',
    name: 'Portable Experience Example',
    thumbnail:
      'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x7dce3d0341fea8a9321ca7280cd2bd8948dc3acf:0/thumbnail',
    url: '/contracts/0x7dce3d0341fea8a9321ca7280cd2bd8948dc3acf/items/0',
    category: NFTCategory.WEARABLE,
    contractAddress: '0x7dce3d0341fea8a9321ca7280cd2bd8948dc3acf',
    rarity: Rarity.MYTHIC,
    available: 9,
    isOnSale: true,
    creator: '0xf14fc98975d16bd8b629ac6ee30811d59d1646f2',
    data: {
      wearable: {
        description: 'This feature is in Alpha state.',
        category: WearableCategory.EYEWEAR,
        bodyShapes: [BodyShape.MALE],
        rarity: Rarity.MYTHIC,
        isSmart: true
      }
    },
    network: Network.MATIC,
    chainId: 80001,
    price: '99000000000000000000',
    createdAt: 1690486692,
    updatedAt: 1690561718,
    reviewedAt: 1690560600,
    firstListedAt: 1690560706,
    soldAt: 1690561718,
    minPrice: '99000000000000000000',
    maxListingPrice: null,
    minListingPrice: null,
    listings: 0,
    owners: null,
    picks: {
      count: 0,
      pickedByUser: false
    }
  }

  return (
    <div className={styles.Overview}>
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
      <AssetCard i18n={translations} asset={asset} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
    </div>
  )
}

export default Overview
