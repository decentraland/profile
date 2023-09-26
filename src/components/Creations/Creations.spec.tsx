import React from 'react'
import { fireEvent, act } from '@testing-library/react'
import { BodyShape, Item, NFTCategory, Network, Rarity, WearableCategory } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import { View } from '../../utils/view'
import { CREATION_ITEM_DATA_TEST_ID, ITEMS_PER_PAGE } from './constants'
import Creations from './Creations'
import { Props } from './Creations.types'

function renderCreations(props: Partial<Props> = {}, initialEntries: string[] = ['/']) {
  return renderWithProviders(
    <Creations
      profileAddress={'0x1'}
      isLoading={false}
      items={[]}
      totalItems={0}
      error={null}
      view={View.OWN}
      onFetchCreations={jest.fn()}
      {...props}
    />,
    { router: { initialEntries } }
  )
}

let renderedComponent: ReturnType<typeof renderCreations>

describe('when rendering the component as loading', () => {
  beforeEach(() => {
    renderedComponent = renderCreations({ isLoading: true })
  })

  it('should render the loading component', () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId('loader')).toBeDefined()
  })
})

describe('when rendering the component', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ onFetchCreations, profileAddress: '0x1' })
  })

  it("should fetch the user's creations", () => {
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: ITEMS_PER_PAGE,
      skip: 0,
      category: 'wearables'
    })
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
    renderedComponent = renderCreations({ items })
  })

  it('should render a card for each of the items', () => {
    const { getByTestId } = renderedComponent

    expect(getByTestId(`${CREATION_ITEM_DATA_TEST_ID}-${items[0].id}`)).toBeInTheDocument()
  })
})

describe('when changing the category', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations })
  })

  it('should re-trigger the creations fetch', () => {
    const { getByText } = renderedComponent
    act(() => {
      fireEvent.click(getByText(t('categories.wearables_head')))
    })
    expect(onFetchCreations).toHaveBeenCalledWith({ creator: '0x1', first: 24, skip: 0, category: 'wearables_head' })
  })
})

describe('when changing the rarity', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations })
  })

  it('should re-trigger the creations fetch', () => {
    const { getByText } = renderedComponent
    act(() => {
      fireEvent.click(getByText('Common'))
    })
    expect(onFetchCreations).toHaveBeenCalledWith({ creator: '0x1', first: 24, skip: 0, category: 'wearables', rarities: ['common'] })
  })
})

describe('when doing an initial load of a page greater than one', () => {
  let onFetchCreations: jest.Mock
  let page: number

  beforeEach(() => {
    page = 4
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations }, [`/account/0x1/creations?page=${page}`])
  })

  it("should fetch the user's creations taking into account the pages", () => {
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: page * ITEMS_PER_PAGE,
      skip: 0,
      category: 'wearables'
    })
  })
})
