import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../tests/tests'
import { ON_SALE_FILTER_DATA_TEST_ID } from './constants'
import OnSaleFilter from './OnSaleFilter'
import { Props } from './OnSaleFilter.types'

function renderOnSaleFilter(props: Partial<Props> = {}) {
  return renderWithProviders(<OnSaleFilter value={false} data-testid="on-sale-filter" onChange={jest.fn()} {...props} />)
}

let renderedComponent: ReturnType<typeof renderOnSaleFilter>

describe('when checking the on sale checkbox', () => {
  let isChecked: boolean
  describe('when the checkbox is checked', () => {
    beforeEach(() => {
      isChecked = true
      renderedComponent = renderOnSaleFilter({ value: isChecked })
    })

    it('should call the onChange method prop with the value as false', async () => {
      const { findByTestId } = renderedComponent
      fireEvent.click(await findByTestId(ON_SALE_FILTER_DATA_TEST_ID))
      expect(isChecked).toBe(!!isChecked)
    })
  })

  describe('when the checkbox is not checked', () => {
    beforeEach(() => {
      isChecked = false
      renderedComponent = renderOnSaleFilter({ value: isChecked })
    })

    it('should call the onChange method prop with the value as true', async () => {
      const { findByTestId } = renderedComponent
      fireEvent.click(await findByTestId(ON_SALE_FILTER_DATA_TEST_ID))
      expect(isChecked).toBe(!!isChecked)
    })
  })
})
