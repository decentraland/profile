import React, { ReactNode } from 'react'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { renderWithProviders } from '../../../tests/tests'
import WithPageView from '.'

jest.mock('decentraland-dapps/dist/modules/analytics/utils')

const mockGetAnalytics = getAnalytics as jest.MockedFunction<typeof getAnalytics>

const CHILDREN_TEST_ID = 'children-test-id'

describe('when rendering the with page view component', () => {
  let analytics: { page: jest.Mock }

  beforeEach(() => {
    analytics = {
      page: jest.fn()
    }

    mockGetAnalytics.mockReturnValueOnce(analytics)
  })

  describe('when a div is provided as children', () => {
    let children: ReactNode

    beforeEach(() => {
      children = <div data-testid={CHILDREN_TEST_ID} />
    })

    it('should render the children', () => {
      const result = renderWithProviders(<WithPageView>{children}</WithPageView>)
      expect(result.queryByTestId(CHILDREN_TEST_ID)).not.toBeNull()
    })

    it('should call the page method from the analytics lib', () => {
      renderWithProviders(<WithPageView>{children}</WithPageView>)
      expect(analytics.page).toHaveBeenCalled()
    })
  })
})
