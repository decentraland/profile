import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import testUserEvent from '@testing-library/user-event'
import { Rarity } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { MainCategory } from '../../utils/categories'
import { ON_SALE_FILTER_DATA_TEST_ID } from '../OnSaleFilter/constants'
import { SMART_WEARABLE_FILTER_DATA_TEST_ID } from './constants'
import NFTFilters from './NFTFilters'
import { Props } from './NFTFilters.types'

function renderNftFilters(props: Partial<Props> = {}) {
  return render(<NFTFilters filters={{}} onChange={jest.fn()} {...props} />)
}

describe.each([
  {
    category: MainCategory.WEARABLE,
    filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')]
  },
  { category: MainCategory.EMOTE, filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')] },
  { category: MainCategory.ENS, filters: [t('categories_menu.title')] },
  { category: MainCategory.LAND, filters: [t('categories_menu.title')] }
])('when the category is $category', ({ category, filters }) => {
  let screen: RenderResult

  beforeEach(() => {
    screen = renderNftFilters({ filters: { category } })
  })

  it.each(filters)('should render %s', filter => {
    expect(screen.getByText(filter)).toBeInTheDocument()
  })
})

describe(`when the category is ${MainCategory.WEARABLE}`, () => {
  let screen: RenderResult

  beforeEach(() => {
    screen = renderNftFilters({ filters: { category: MainCategory.WEARABLE } })
  })

  it('should render the smart wearable filter', () => {
    expect(screen.getByTestId(SMART_WEARABLE_FILTER_DATA_TEST_ID)).toBeInTheDocument()
  })
})

describe('when changing rarity', () => {
  let onChange: jest.Mock
  let screen: RenderResult

  beforeEach(() => {
    onChange = jest.fn()
    screen = renderNftFilters({ onChange })
  })

  it('should call onChange function with the right params', async () => {
    const raritybutton = screen.getByText(t('@dapps.rarities.common'))
    await testUserEvent.click(raritybutton)
    expect(onChange).toHaveBeenCalledWith({ itemRarities: [Rarity.COMMON] })
  })
})

describe('when changing category', () => {
  let onChange: jest.Mock
  let screen: RenderResult

  beforeEach(() => {
    onChange = jest.fn()
    screen = renderNftFilters({ onChange })
  })

  it('should call onChange function with the right params', async () => {
    const emoteCategoryBtn = screen.getByText(t(`categories.${MainCategory.EMOTE}`))
    await testUserEvent.click(emoteCategoryBtn)
    expect(onChange).toHaveBeenCalledWith({ category: MainCategory.EMOTE })
  })
})

describe('when changing the on sale filter', () => {
  let onChange: jest.Mock
  let screen: RenderResult

  beforeEach(() => {
    onChange = jest.fn()
    screen = renderNftFilters({ onChange })
  })

  it('should call onChange function with the isOnSale parameter', async () => {
    const onSaleBtn = screen.getByTestId(ON_SALE_FILTER_DATA_TEST_ID)
    await testUserEvent.click(onSaleBtn)
    expect(onChange).toHaveBeenCalledWith({ isOnSale: true })
  })
})

describe('when changing the smart wearable filter', () => {
  let onChange: jest.Mock
  let screen: RenderResult

  beforeEach(() => {
    onChange = jest.fn()
    screen = renderNftFilters({ onChange })
  })

  it('should call onChange function with the isWearableSmart parameter', async () => {
    const smartWearableBtn = screen.getByTestId(SMART_WEARABLE_FILTER_DATA_TEST_ID).querySelector('input')
    await testUserEvent.click(smartWearableBtn as Element)
    expect(onChange).toHaveBeenCalledWith({ isWearableSmart: true })
  })
})
