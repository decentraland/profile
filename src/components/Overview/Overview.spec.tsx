import React from 'react'
import { BodyShape, Item, NFTCategory, Network, Rarity, WearableCategory } from '@dcl/schemas'
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

describe('when rendering the component as loading', () => {
  beforeEach(() => {
    renderedComponent = renderOverview({ isLoading: true })
  })

  it('should render the component with a spinner', () => {
    expect(renderedComponent.queryByTestId('overview')?.querySelector('.loader')).not.toBeNull()
  })
})

describe('when rendering the component with items', () => {
  let items: Item[]

  beforeEach(() => {
    items = [
      {
        id: '1',
        name: 'a name',
        thumbnail: 'a thumbnail',
        url: 'a url',
        rarity: Rarity.COMMON,
        price: '100',
        beneficiary: 'a beneficiary',
        contractAddress: 'a contract address',
        isOnSale: true,
        category: NFTCategory.WEARABLE,
        itemId: 'anId',
        available: 1,
        creator: '0x0',
        createdAt: 10123123,
        updatedAt: 10123123,
        reviewedAt: 10123123,
        soldAt: 10123123,
        network: Network.ETHEREUM,
        chainId: 1,
        data: {
          wearable: {
            description: 'a description',
            category: WearableCategory.EARRING,
            bodyShapes: [BodyShape.MALE],
            rarity: Rarity.COMMON,
            isSmart: false
          }
        },
        urn: 'anUrn',
        firstListedAt: 10123123
      }
    ]
    renderedComponent = renderOverview({ items })
  })

  it('should render an asset card for each item', () => {
    expect(renderedComponent.getByTestId(`overview-${items[0].id}`)).toBeInTheDocument()
  })
})
