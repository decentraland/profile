import { ItemSortBy } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { MainCategory, AccessoryCategory, WearableCategory, EmoteCategory, HeadCategory } from '../../utils/categories'

function buildCategoryFilterItem(category: string) {
  return {
    id: category,
    label: t(`categories.${category}`)
  }
}

export function buildCategoryFilterCategories() {
  return [
    {
      ...buildCategoryFilterItem(MainCategory.WEARABLE),
      children: [
        {
          ...buildCategoryFilterItem(WearableCategory.HEAD),
          children: Object.values(HeadCategory).map(value => buildCategoryFilterItem(value))
        },
        ...Object.values(WearableCategory)
          .filter(value => value !== WearableCategory.HEAD && value !== WearableCategory.ACCESSORIES)
          .map(value => buildCategoryFilterItem(value)),
        {
          ...buildCategoryFilterItem(WearableCategory.ACCESSORIES),
          children: Object.values(AccessoryCategory).map(value => buildCategoryFilterItem(value))
        }
      ]
    },
    {
      ...buildCategoryFilterItem(MainCategory.EMOTE),
      children: Object.values(EmoteCategory).map(value => buildCategoryFilterItem(value))
    }
  ]
}

export function buildSortByOptions() {
  return Object.values(ItemSortBy).map(value => ({ value, text: t(`items_sort_by.${value}`) }))
}
