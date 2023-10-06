import React from 'react'
import { fireEvent, act } from '@testing-library/react'
import { BodyShape, Item, NFTCategory, Network, Rarity, WearableCategory as BaseWearableCategory, ItemSortBy } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { ItemSaleStatus } from '../../modules/items/types'
import { renderWithProviders } from '../../tests/tests'
import { MainCategory, WearableCategory } from '../../utils/categories'
import { View } from '../../utils/view'
import { CREATION_ITEM_DATA_TEST_ID, ITEMS_PER_PAGE } from './constants'
import Creations from './Creations'
import { Props } from './Creations.types'

function renderCreations(props: Partial<Props> = {}, initialEntries: string[] = ['/']) {
  return renderWithProviders(
    <Creations
      profileName="a name"
      profileAddress={'0x1'}
      isLoading={false}
      items={[]}
      totalItems={0}
      error={null}
      view={View.OWN}
      onFetchCreations={jest.fn()}
      onOpenMobileFilters={jest.fn()}
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
      rarities: [],
      category: MainCategory.WEARABLE,
      sortBy: ItemSortBy.NEWEST,
      status: ItemSaleStatus.ON_SALE
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
            category: BaseWearableCategory.EARRING,
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

describe('when rendering the component without items', () => {
  let items: Item[]
  let view: View

  beforeEach(() => {
    items = []
  })

  describe('and the view is of the own user', () => {
    beforeEach(() => {
      view = View.OWN
    })

    describe('and the category is of a wearable', () => {
      beforeEach(() => {
        renderedComponent = renderCreations({ items, view }, ['/creations?category=wearable'])
      })

      it('should render a message saying that the user does not have wearables created', () => {
        const { getByText } = renderedComponent
        expect(getByText(t('creations.own_empty_wearables_title'))).toBeInTheDocument()
      })
    })

    describe('and the category is emotes', () => {
      beforeEach(() => {
        renderedComponent = renderCreations({ items, view }, ['/creations?category=emote'])
      })

      it('should render a message saying that the user does not have emotes created', () => {
        const { getByText } = renderedComponent
        expect(getByText(t('creations.own_empty_emotes_title'))).toBeInTheDocument()
      })
    })
  })

  describe("and the view is of the other's user", () => {
    let profileName: string

    beforeEach(() => {
      view = View.OTHER
      profileName = 'aName'
    })

    describe('and the category is wearables', () => {
      beforeEach(() => {
        renderedComponent = renderCreations({ items, view, profileName }, ['/creations?category=wearable'])
      })

      it('should render a message saying that the user does not have wearables created', () => {
        const { getByText } = renderedComponent
        expect(getByText(t('creations.other_empty_wearables_title', { name: profileName }))).toBeInTheDocument()
      })
    })

    describe('and the category is emotes', () => {
      beforeEach(() => {
        renderedComponent = renderCreations({ items, view, profileName }, ['/creations?category=emote'])
      })

      it('should render a message saying that the user does not have emotes created', () => {
        const { getByText } = renderedComponent
        expect(getByText(t('creations.other_empty_emotes_title', { name: profileName }))).toBeInTheDocument()
      })
    })
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
      fireEvent.click(getByText(t(`categories.${WearableCategory.HEAD}`)))
    })
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: 24,
      rarities: [],
      sortBy: ItemSortBy.NEWEST,
      category: WearableCategory.HEAD,
      skip: 0,
      status: ItemSaleStatus.ON_SALE
    })
  })
})

describe('when changing the rarity', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations })
  })

  it('should re-trigger the creations fetch with the new rarity', () => {
    const { getByText } = renderedComponent
    act(() => {
      fireEvent.click(getByText('Common'))
    })

    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: 24,
      skip: 0,
      category: MainCategory.WEARABLE,
      rarities: ['common'],
      sortBy: ItemSortBy.NEWEST,
      status: ItemSaleStatus.ON_SALE
    })
  })
})

describe('when changing the item sale status', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations })
  })

  it('should re-trigger the creations fetch with the new sale status', () => {
    const { getByText } = renderedComponent

    act(() => {
      // Select and click the "Only Listings" radio button
      fireEvent.click(getByText('Only Listings').parentElement?.querySelector('input') ?? new HTMLElement())
    })
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: 24,
      skip: 0,
      sortBy: ItemSortBy.NEWEST,
      category: MainCategory.WEARABLE,
      rarities: [],
      status: ItemSaleStatus.ONLY_LISTING
    })
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
      rarities: [],
      sortBy: ItemSortBy.NEWEST,
      category: MainCategory.WEARABLE,
      status: ItemSaleStatus.ON_SALE
    })
  })
})

describe('when changing the sorting', () => {
  let onFetchCreations: jest.Mock

  beforeEach(() => {
    onFetchCreations = jest.fn()
    renderedComponent = renderCreations({ profileAddress: '0x1', onFetchCreations })
  })

  it('should re-trigger the creations fetch with the selected sort', () => {
    const { getByText } = renderedComponent
    act(() => {
      fireEvent.click(getByText(t(`items_sort_by.${ItemSortBy.CHEAPEST}`)))
    })
    expect(onFetchCreations).toHaveBeenCalledWith({
      creator: '0x1',
      first: 24,
      skip: 0,
      category: MainCategory.WEARABLE,
      rarities: [],
      sortBy: ItemSortBy.CHEAPEST,
      status: ItemSaleStatus.ON_SALE
    })
  })
})
