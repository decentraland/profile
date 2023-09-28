import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AccessoryCategory, HeadCategory, LandCategory, MainCategory, WearableCategory, EmoteCategory } from '../../utils/categories'

export function buildCategoryFilterCategories() {
  return [
    {
      id: MainCategory.WEARABLE,
      label: t(`categories.${MainCategory.WEARABLE}`),
      children: [
        {
          id: WearableCategory.HEAD,
          label: t(`categories.${WearableCategory.HEAD}`),
          children: Object.values(HeadCategory).map(value => ({ id: value, label: t(`categories.${value}`) }))
        },
        ...Object.values(WearableCategory)
          .filter(value => value !== WearableCategory.HEAD && value !== WearableCategory.ACCESSORIES)
          .map(value => ({ id: value, label: t(`categories.${value}`) })),
        {
          id: WearableCategory.ACCESSORIES,
          label: t(`categories.${WearableCategory.ACCESSORIES}`),
          children: Object.values(AccessoryCategory).map(value => ({ id: value, label: t(`categories.${value}`) }))
        }
      ]
    },
    {
      id: MainCategory.EMOTE,
      label: t(`categories.${MainCategory.EMOTE}`),
      children: Object.values(EmoteCategory).map(value => ({ id: value, label: t(`categories.${value}`) }))
    },
    {
      id: MainCategory.LAND,
      label: t(`categories.${MainCategory.LAND}`),
      children: Object.values(LandCategory).map(value => ({ id: value, label: t(`categories.${value}`) }))
    },
    {
      id: MainCategory.ENS,
      label: t(`categories.${MainCategory.ENS}`)
    }
  ]
}
