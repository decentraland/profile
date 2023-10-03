import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AssetStatus } from 'decentraland-ui/dist/components/AssetStatusFilter'
import {
  AccessoryCategory,
  EmotesCategory,
  HeadCategory,
  ItemSaleStatus,
  MainCategories,
  WearableCategory
} from '../../modules/items/types'

function buildCategoryFilterItem(category: string) {
  return {
    id: category,
    label: t(`categories.${category}`)
  }
}

export function buildCategoryFilterCategories() {
  return [
    {
      ...buildCategoryFilterItem(MainCategories.WEARABLES),
      children: [
        {
          ...buildCategoryFilterItem(WearableCategory.WEARABLES_HEAD),
          children: Object.values(HeadCategory).map(value => buildCategoryFilterItem(value))
        },
        ...Object.values(WearableCategory)
          .filter(value => value !== WearableCategory.WEARABLES_HEAD && value !== WearableCategory.WEARABLES_ACCESSORIES)
          .map(value => buildCategoryFilterItem(value)),
        {
          ...buildCategoryFilterItem(WearableCategory.WEARABLES_ACCESSORIES),
          children: Object.values(AccessoryCategory).map(value => buildCategoryFilterItem(value))
        }
      ]
    },
    {
      ...buildCategoryFilterItem(MainCategories.EMOTES),
      children: Object.values(EmotesCategory).map(value => buildCategoryFilterItem(value))
    }
  ]
}

export function convertAssetStatusToItemSaleStatus(status: AssetStatus): ItemSaleStatus {
  switch (status) {
    case AssetStatus.ON_SALE:
      return ItemSaleStatus.ON_SALE
    case AssetStatus.ONLY_MINTING:
      return ItemSaleStatus.ONLY_MINTING
    case AssetStatus.ONLY_LISTING:
      return ItemSaleStatus.ONLY_LISTING
    case AssetStatus.NOT_FOR_SALE:
      return ItemSaleStatus.NOT_FOR_SALE
  }
}

export function convertItemSaleStatusToAssetStatus(status: ItemSaleStatus): AssetStatus {
  switch (status) {
    case ItemSaleStatus.ON_SALE:
      return AssetStatus.ON_SALE
    case ItemSaleStatus.ONLY_MINTING:
      return AssetStatus.ONLY_MINTING
    case ItemSaleStatus.ONLY_LISTING:
      return AssetStatus.ONLY_LISTING
    case ItemSaleStatus.NOT_FOR_SALE:
      return AssetStatus.NOT_FOR_SALE
  }
}
