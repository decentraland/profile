import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { MainCategory } from '../../utils/categories'
import { NFTFilters } from './NFTFilters'
import { Props } from './NFTFilters.types'
import userEvent from '@testing-library/user-event'
import { Rarity } from '@dcl/schemas'

function renderNFTFilters(props: Partial<Props> = {}) {
  return render(<NFTFilters filters={{}} onChange={jest.fn()} {...props} />)
}

describe.each([
  { category: MainCategory.WEARABLE, filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')] },
  { category: MainCategory.EMOTE, filters: [t('categories_menu.title'), t('@dapps.rarities_filter.title')] },
  { category: MainCategory.ENS, filters: [t('categories_menu.title')] },
  { category: MainCategory.LAND, filters: [t('categories_menu.title')] }
])('when category is $category', ({ category, filters }) => {
  let screen: RenderResult

  beforeEach(() => {
    screen = renderNFTFilters({ filters: { category } })
  })

  it.each(filters)(`should render %s`, filter => {
    expect(screen.getByText(filter)).toBeInTheDocument()
  })
})

describe("when changing rarity", () => {
  it("should call onChange function with the right params", async () => {
    const onChange = jest.fn()
    const screen = renderNFTFilters({ onChange })
    const raritybutton = screen.getByText(t('@dapps.rarities.common'))
    await userEvent.click(raritybutton)
    expect(onChange).toHaveBeenCalledWith({ itemRarities: [Rarity.COMMON] })
  })
})

describe("when changing category", () => {
  it("should call onChange function with the right params", async () => {
    const onChange = jest.fn()
    const screen = renderNFTFilters({ onChange })
    const emoteCategoryBtn = screen.getByText(t(`categories.${MainCategory.EMOTE}`))
    await userEvent.click(emoteCategoryBtn)
    expect(onChange).toHaveBeenCalledWith({ category: MainCategory.EMOTE })
  })
})
