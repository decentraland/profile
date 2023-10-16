import nock from 'nock'
import { CatalogSortBy, Item, Network, Rarity } from '@dcl/schemas'
import { EmoteCategory, MainCategory, WearableCategory } from '../../utils/categories'
import { ItemsClient } from './client'
import { Options, ItemSaleStatus } from './types'

let client: ItemsClient
let items: Item[]

const scope = nock('https://example.com/')
nock.disableNetConnect()

beforeEach(() => {
  client = new ItemsClient('https://example.com')
  items = [{ id: 'anItemId' } as Item]
})

describe.each<[string, Options, string]>([
  ['urns', { urns: ['firstUrn', 'secondUrn'] }, 'urn=firstUrn&urn=secondUrn'],
  ['ids', { ids: ['firstId', 'secondId'] }, 'id=firstId&id=secondId'],
  ['network', { network: Network.MATIC }, 'network=MATIC'],
  ['creator', { creator: 'aCreator' }, 'creator=aCreator'],
  ['rarities', { rarities: [Rarity.COMMON, Rarity.EPIC] }, 'rarity=common&rarity=epic'],
  ['sortBy', { sortBy: CatalogSortBy.CHEAPEST }, 'sortBy=cheapest'],
  ['isWearableSmart', { isWearableSmart: true }, 'isWearableSmart=true']
])('when requesting items with the %s option', (type, options, queryString) => {
  beforeEach(() => {
    scope.get(`/v1/catalog?${queryString}`).reply(200, {
      data: items
    })
  })

  it(`should request the API with the ${type} in the query string and return the resulting items`, async () => {
    const response = await client.get(options)
    expect(nock.isDone()).toBe(true)
    expect(response).toEqual({ data: items })
  })
})

describe('when requesting the items with a category', () => {
  let options: Options

  describe('and the category is wearables', () => {
    beforeEach(() => {
      scope.get('/v1/catalog?category=wearable').reply(200, {
        data: items
      })
      options = { category: MainCategory.WEARABLE }
    })

    it('should request the API with the category in the query string and return the resulting items', async () => {
      const response = await client.get(options)
      expect(nock.isDone()).toBe(true)
      expect(response).toEqual({ data: items })
    })
  })

  describe('and the category is a type of wearable', () => {
    beforeEach(() => {
      scope.get('/v1/catalog?category=wearable&wearableCategory=head').reply(200, {
        data: items
      })
      options = { category: WearableCategory.HEAD }
    })

    it('should request the API with the category and the wearable category in the query string and return the resulting items', async () => {
      const response = await client.get(options)
      expect(nock.isDone()).toBe(true)
      expect(response).toEqual({ data: items })
    })
  })

  describe('and the category is emotes', () => {
    beforeEach(() => {
      scope.get('/v1/catalog?category=emote').reply(200, {
        data: items
      })
      options = { category: MainCategory.EMOTE }
    })

    it('should request the API with the category in the query string and return the resulting items', async () => {
      const response = await client.get(options)
      expect(nock.isDone()).toBe(true)
      expect(response).toEqual({ data: items })
    })
  })

  describe('and the category is a type of emotes', () => {
    beforeEach(() => {
      scope.get('/v1/catalog?category=emote&emoteCategory=fun').reply(200, {
        data: items
      })
      options = { category: EmoteCategory.FUN }
    })

    it('should request the API with the category and the emote category in the query string and return the resulting items', async () => {
      const response = await client.get(options)
      expect(nock.isDone()).toBe(true)
      expect(response).toEqual({ data: items })
    })
  })
})

describe('when requesting the items with a status', () => {
  let options: Options

  describe.each([
    [ItemSaleStatus.ON_SALE, 'isOnSale=true'],
    [ItemSaleStatus.NOT_FOR_SALE, 'isOnSale=false'],
    [ItemSaleStatus.ONLY_LISTING, 'onlyListing=true'],
    [ItemSaleStatus.ONLY_MINTING, 'onlyMinting=true']
  ])('and the status is %s', (status, query) => {
    beforeEach(() => {
      scope.get(`/v1/catalog?${query}`).reply(200, {
        data: items
      })
      options = { status }
    })

    it(`should request the API with the query "${query}" and return the resulting items`, async () => {
      const response = await client.get(options)
      expect(nock.isDone()).toBe(true)
      expect(response).toEqual({ data: items })
    })
  })
})

describe('when requesting the items with "isWearableSmart"', () => {
  let options: Options
  let isWearableSmart: boolean

  beforeEach(() => {
    isWearableSmart = true
    scope.get(`/v1/catalog?isWearableSmart=${isWearableSmart}`).reply(200, {
      data: items
    })
    options = { isWearableSmart }
  })

  it('should request the API with the query isWearableSmart=true and return the resulting items', async () => {
    const response = await client.get(options)
    expect(nock.isDone()).toBe(true)
    expect(response).toEqual({ data: items })
  })
})
