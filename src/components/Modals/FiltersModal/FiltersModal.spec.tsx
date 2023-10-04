import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../../tests/tests'
import {
  FILTERS_MODAL_APPLY_FILTERS_BUTTON_DATA_TEST_ID,
  FILTERS_MODAL_CLEAR_FILTERS_BUTTON_DATA_TEST_ID,
  FILTERS_MODAL_CLOSE_BUTTON_DATA_TEST_ID
} from './constants'
import FiltersModal from './FiltersModal'
import { Props } from './FiltersModal.types'

function renderFiltersModal(props: Partial<Props> = {}) {
  return renderWithProviders(
    <FiltersModal
      name="FiltersModal"
      onClose={jest.fn()}
      clearFilters={jest.fn()}
      applyFilters={jest.fn()}
      children={<div></div>}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderFiltersModal>

describe('when clicking the close button', () => {
  let onClose: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
    renderedComponent = renderFiltersModal({ onClose })
  })

  it('should call the onClose method prop', () => {
    const { getByTestId } = renderedComponent
    fireEvent.click(getByTestId(FILTERS_MODAL_CLOSE_BUTTON_DATA_TEST_ID))
    expect(onClose).toHaveBeenCalled()
  })
})

describe('when clicking the apply filters button', () => {
  let applyFilters: jest.Mock

  beforeEach(() => {
    applyFilters = jest.fn()
    renderedComponent = renderFiltersModal({ applyFilters })
  })

  it('should call the applyFilters method prop', () => {
    const { getByTestId } = renderedComponent
    fireEvent.click(getByTestId(FILTERS_MODAL_APPLY_FILTERS_BUTTON_DATA_TEST_ID))
    expect(applyFilters).toHaveBeenCalled()
  })
})

describe('when clicking the reset filters button', () => {
  let clearFilters: jest.Mock

  beforeEach(() => {
    clearFilters = jest.fn()
    renderedComponent = renderFiltersModal({ clearFilters })
  })

  it('should call the applyFilters method prop', () => {
    const { getByTestId } = renderedComponent
    fireEvent.click(getByTestId(FILTERS_MODAL_CLEAR_FILTERS_BUTTON_DATA_TEST_ID))
    expect(clearFilters).toHaveBeenCalled()
  })
})
