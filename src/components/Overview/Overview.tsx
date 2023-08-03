import React, { useEffect } from 'react'
import { Item } from '@dcl/schemas'
import { AssetCardTranslations, AssetCardFilters, AssetCard } from 'decentraland-dapps/dist/containers/AssetCard/AssetCard'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Loader } from 'decentraland-ui/dist/components/Loader/Loader'
import { config } from '../../modules/config'
import { Props } from './Overview.types'
import styles from './Overview.module.css'

const MARKETPLACE_URL = config.get('MARKETPLACE_URL', '')

const Overview = (props: Props) => {
  const { profileAddress, isLoading, error, items, profile } = props
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

  useEffect(() => {
    console.log('flo a ver', profileAddress, profile)
    // onFetchItems(profileAddress.w)
  }, [profileAddress])

  return (
    <div className={styles.Overview}>
      {isLoading ? (
        <Loader active />
      ) : error ? (
        <div>ERROR</div>
      ) : (
        items.map((item: Item) => (
          <AssetCard i18n={translations} asset={item} assetFilters={{} as AssetCardFilters} onClickCardURL={MARKETPLACE_URL} />
        ))
      )}
    </div>
  )
}

export default Overview
