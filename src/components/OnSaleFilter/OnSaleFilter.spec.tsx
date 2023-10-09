import React from 'react'
import { fireEvent } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import OnSaleFilter from './OnSaleFilter'
import { Props } from './OnSaleFilter.types'

function renderOnSaleFilter(props: Partial<Props> = {}) {
  return renderWithProviders(<OnSaleFilter value={false} data-testid="on-sale-filter" onChange={jest.fn()} {...props} />)
}

let renderedComponent: ReturnType<typeof renderOnSaleFilter>

describe('when checking the on sale checkbox', () => {
  let isChecked: boolean
  let onChange: jest.Mock

  describe('when the checkbox is checked', () => {
    beforeEach(() => {
      isChecked = true
      onChange = jest.fn()
      renderedComponent = renderOnSaleFilter({ value: isChecked, onChange })
    })

    it('should call the onChange method prop with the value as false', async () => {
      const { findByText } = renderedComponent
      fireEvent.click((await findByText(t('on_sale_filter.label'))).previousSibling as Element)
      expect(onChange).toHaveBeenCalledWith(!isChecked)
    })
  })

  describe('when the checkbox is not checked', () => {
    beforeEach(() => {
      isChecked = false
      onChange = jest.fn()
      renderedComponent = renderOnSaleFilter({ value: isChecked, onChange })
    })

    it('should call the onChange method prop with the value as true', async () => {
      const { findByText } = renderedComponent
      fireEvent.click((await findByText(t('on_sale_filter.label'))).previousSibling as Element)
      expect(onChange).toHaveBeenCalledWith(!isChecked)
    })
  })
})
