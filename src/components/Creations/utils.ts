import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AccessoryCategory, EmotesCategory, HeadCategory, MainCategories, WearableCategory } from '../../modules/items/types'

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
