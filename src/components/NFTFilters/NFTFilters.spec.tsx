import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import testUserEvent from '@testing-library/user-event'
import { Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { MainCategory } from '../../utils/categories'
import { ON_SALE_FILTER_DATA_TEST_ID } from '../OnSaleFilter/constants'
import { NftFilters } from './NFTFilters'
import { Props } from './NFTFilters.types'

function renderNftFilters(props: Partial<Props> = {}) {
  return render(<NftFilters filters={{}} onChange={jest.fn()} {...props} />)
}

describe.each([
  { category: MainCategory.WEARABLE, filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')] },
  { category: MainCategory.EMOTE, filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')] },
  { category: MainCategory.ENS, filters: [t('categories_menu.title')] },
  { category: MainCategory.LAND, filters: [t('categories_menu.title')] }
])('when category is $category', ({ category, filters }) => {
  let screen: RenderResult

  beforeEach(() => {
    screen = renderNftFilters({ filters: { category } })
  })

  it.each(filters)('should render %s', filter => {
    expect(screen.getByText(filter)).toBeInTheDocument()
  })
})

describe('when changing rarity', () => {
  it('should call onChange function with the right params', async () => {
    const onChange = jest.fn()
    const screen = renderNftFilters({ onChange })
    const raritybutton = screen.getByText(t('@dapps.rarities.common'))
    await testUserEvent.click(raritybutton)
    expect(onChange).toHaveBeenCalledWith({ itemRarities: [Rarity.COMMON] })
  })
})

describe('when changing category', () => {
  it('should call onChange function with the right params', async () => {
    const onChange = jest.fn()
    const screen = renderNftFilters({ onChange })
    const emoteCategoryBtn = screen.getByText(t(`categories.${MainCategory.EMOTE}`))
    await testUserEvent.click(emoteCategoryBtn)
    expect(onChange).toHaveBeenCalledWith({ category: MainCategory.EMOTE })
  })
})

describe('when changing the on sale filter', () => {
  it('should call onChange function with the isOnSale parameter', async () => {
    const onChange = jest.fn()
    const screen = renderNftFilters({ onChange })
    const onSaleBtn = screen.getByTestId(ON_SALE_FILTER_DATA_TEST_ID)

    await testUserEvent.click(onSaleBtn as Element)
    expect(onChange).toHaveBeenCalledWith({ isOnSale: true })
  })
})
