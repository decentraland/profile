import nock from 'nock'
import { Item, Network, Rarity } from '@dcl/schemas'
import { ItemsClient } from './client'
import { Options } from './types'
import { EmoteCategory, MainCategory, WearableCategory } from '../../utils/categories'

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
  ['rarities', { rarities: [Rarity.COMMON, Rarity.EPIC] }, 'rarity=common&rarity=epic']
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
