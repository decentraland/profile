import React from 'react'
import { fireEvent } from '@testing-library/react'
import { ItemSortBy } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useMobileMediaQuery } from 'decentraland-ui/dist/components/Media/Media'
import { renderWithProviders } from '../../tests/tests'
import { buildSortByOptions } from '../Creations/utils'
import { INFORMATION_BAR_COUNTER_DATA_TEST_ID, INFORMATION_BAR_MOBILE_DATA_TEST_ID } from './constants'
import InformationBar from './InformationBar'
import { Props } from './InformationBar.types'

jest.mock('decentraland-ui/dist/components/Media/Media', () => ({
  useMobileMediaQuery: jest.fn()
}))

const useMobileMediaQueryMock = useMobileMediaQuery as jest.MockedFunction<typeof useMobileMediaQuery>

function renderInformationBar(props: Partial<Props<ItemSortBy>> = {}) {
  return renderWithProviders(
    <InformationBar
      sortBy={ItemSortBy.NAME}
      sortByOptions={buildSortByOptions()}
      getCountText={count => count.toString()}
      onSortByChange={jest.fn()}
      onOpenFiltersModal={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderInformationBar>

describe('when rendering the component', () => {
  let count: number | undefined
  beforeEach(() => {
    useMobileMediaQueryMock.mockReturnValue(false)
  })

  describe('and count is undefined', () => {
    beforeEach(() => {
      count = undefined
      renderedComponent = renderInformationBar({ count })
    })

    it('should not show the counter', () => {
      const { queryByTestId } = renderedComponent
      expect(queryByTestId(INFORMATION_BAR_COUNTER_DATA_TEST_ID)).not.toBeInTheDocument()
    })
  })

  describe('and the count is not undefined', () => {
    let isLoading: boolean

    beforeEach(() => {
      count = 3
    })

    describe('and is loading', () => {
      beforeEach(() => {
        isLoading = true
        renderedComponent = renderInformationBar({ count, isLoading })
      })

      it('should not show the counter', () => {
        const { queryByTestId } = renderedComponent
        expect(queryByTestId(INFORMATION_BAR_COUNTER_DATA_TEST_ID)).not.toBeInTheDocument()
      })
    })

    describe('and is not loading', () => {
      beforeEach(() => {
        isLoading = false
        renderedComponent = renderInformationBar({ count, isLoading })
      })

      it('should show the count', () => {
        const { getByTestId } = renderedComponent
        expect(getByTestId(INFORMATION_BAR_COUNTER_DATA_TEST_ID)).toHaveTextContent(count?.toString() ?? '')
      })
    })
  })
})

describe('when changing the sorting options', () => {
  let onSortByChange: jest.Mock

  beforeEach(() => {
    useMobileMediaQueryMock.mockReturnValue(false)
    onSortByChange = jest.fn()
    renderedComponent = renderInformationBar({ onSortByChange })
  })

  it('should call the onSortByChange prop method with the new sort option', () => {
    const { getByText } = renderedComponent
    fireEvent.click(getByText(t(`catalog_sort_by.${ItemSortBy.RECENTLY_LISTED}`)))
    expect(onSortByChange).toHaveBeenCalledWith(ItemSortBy.RECENTLY_LISTED)
  })
})

describe('when rendering the mobile version', () => {
  let onOpenFiltersModal: jest.Mock

  beforeEach(() => {
    useMobileMediaQueryMock.mockReturnValue(true)
    onOpenFiltersModal = jest.fn()
    renderedComponent = renderInformationBar({ onOpenFiltersModal })
  })

  it('should display the mobile bar', () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId(INFORMATION_BAR_MOBILE_DATA_TEST_ID)).toBeInTheDocument()
  })

  describe('and clicking the open filters button', () => {
    it('should call the open filters modal method prop', () => {
      const { getByTestId } = renderedComponent
      fireEvent.click(getByTestId(INFORMATION_BAR_MOBILE_DATA_TEST_ID))
      expect(onOpenFiltersModal).toHaveBeenCalled()
    })
  })
})
