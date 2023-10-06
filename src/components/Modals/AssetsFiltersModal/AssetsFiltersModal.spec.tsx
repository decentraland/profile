import React from 'react'
import userEvent from '@testing-library/user-event'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { LOCATION_DISPLAY_TEST_ID, renderWithProviders } from '../../../tests/tests'
import AssetsFiltersModal from './AssetsFiltersModal'
import { Props } from './AssetsFiltersModal.types'

function renderAssetFiltersModal(props: Partial<Props> = {}, initialEntries: string[] = ['/']) {
  return renderWithProviders(<AssetsFiltersModal name="FiltersModal" onClose={jest.fn()} {...props} />, { router: { initialEntries } })
}

let screen: ReturnType<typeof renderAssetFiltersModal>

describe('when clearing the filters and then applying them', () => {
  beforeEach(() => {
    screen = renderAssetFiltersModal({}, ['/assets?category=wearable&itemRarities=legendary,mythic'])
  })

  it('should remove all filters', async () => {
    await userEvent.click(screen.getByText(t('filters_modal.reset')))
    await userEvent.click(screen.getByText(t('filters_modal.apply')))
    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent('/assets?page=1')
  })
})

describe('when changing the item rarities filter and then applying it', () => {
  beforeEach(() => {
    screen = renderAssetFiltersModal({}, ['/assets?category=wearable&itemRarities=legendary,mythic'])
  })

  it('should change the filters to the new ones', async () => {
    await userEvent.click(screen.getByText('Common'))
    await userEvent.click(screen.getByText(t('filters_modal.apply')))
    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      `/assets?category=wearable&itemRarities=${encodeURIComponent('legendary,mythic,common')}&page=1`
    )
  })
})

describe('when changing the category filter and then applying it', () => {
  beforeEach(() => {
    screen = renderAssetFiltersModal({}, ['/assets?category=wearable&itemRarities=legendary,mythic'])
  })

  it('should change the filters to the new ones', async () => {
    await userEvent.click(screen.getByText('Emotes'))
    await userEvent.click(screen.getByText(t('filters_modal.apply')))
    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      `/assets?category=emote&itemRarities=${encodeURIComponent('legendary,mythic')}&page=1`
    )
  })
})
