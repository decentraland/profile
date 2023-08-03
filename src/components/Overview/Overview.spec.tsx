import React from 'react'
import { renderWithProviders } from '../../tests/tests'
import Overview from './Overview'
import { Props } from './Overview.types'

function renderOverview(props: Partial<Props> = {}) {
  return renderWithProviders(
    <Overview isLoading={false} profileAddress="anAddress" error={null} items={[]} onFetchItems={jest.fn()} wearableIds={[]} {...props} />
  )
}

let renderedComponent: ReturnType<typeof renderOverview>

describe('when mounting the component', () => {
  let wearableIds: string[]
  let onFetchItems: jest.Mock

  beforeEach(() => {
    onFetchItems = jest.fn()
  })

  describe("and there aren't any wearable ids", () => {
    beforeEach(() => {
      wearableIds = []
      renderedComponent = renderOverview({ wearableIds, onFetchItems })
    })

    it("should't call the onFetchItems method prop", () => {
      expect(onFetchItems).not.toHaveBeenCalled()
    })
  })

  describe('and there are more than one wearable id', () => {
    beforeEach(() => {
      wearableIds = ['1', '2']
      renderedComponent = renderOverview({ wearableIds, onFetchItems })
    })

    it('should call the onFetchItems method prop', () => {
      expect(onFetchItems).toHaveBeenCalled()
    })
  })
})

describe('when rendering the component without items', () => {
  beforeEach(() => {
    renderedComponent = renderOverview({ items: [] })
  })

  it('should render the component with a message', () => {
    expect(renderedComponent.getByTestId('overview-empty')).toBeInTheDocument()
  })
})
