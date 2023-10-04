import React from 'react'
import { fireEvent, act } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { LOCATION_DISPLAY_TEST_ID, renderWithProviders } from '../../../tests/tests'
import CreationsFiltersModal from './CreationsFiltersModal'
import { Props } from './CreationsFiltersModal.types'

function renderFiltersModal(props: Partial<Props> = {}, initialEntries: string[] = ['/']) {
  return renderWithProviders(<CreationsFiltersModal name="FiltersModal" onClose={jest.fn()} {...props} />, { router: { initialEntries } })
}

let renderedComponent: ReturnType<typeof renderFiltersModal>

describe('when clearing the filters and then applying them', () => {
  beforeEach(() => {
    renderedComponent = renderFiltersModal({}, ['/creations?category=wearable&rarities=legendary,mythic'])
  })

  it('should remove all filters', () => {
    const { getByText, getByTestId } = renderedComponent

    act(() => {
      fireEvent.click(getByText(t('filters_modal.reset')))
    })
    act(() => {
      fireEvent.click(getByText(t('filters_modal.apply')))
    })

    expect(getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent('/creations?page=1')
  })
})

describe('when changing the filters and then applying them', () => {
  beforeEach(() => {
    renderedComponent = renderFiltersModal({}, ['/creations?category=wearable&rarities=legendary,mythic'])
  })

  it('should change the filters to the new ones', () => {
    const { getByText, getByTestId } = renderedComponent

    act(() => {
      fireEvent.click(getByText('Common'))
    })
    act(() => {
      fireEvent.click(getByText(t('filters_modal.apply')))
    })

    expect(getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      `/creations?category=wearable&rarities=${encodeURIComponent('legendary,mythic,common')}&page=1`
    )
  })
})
