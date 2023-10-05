import nock from 'nock'
import { Rarity } from '@dcl/schemas'
import { EmoteCategory, LandCategory, MainCategory, WearableCategory } from '../../utils/categories'
import { NFTClient } from './client'
import { NFTOptions, NFTResult } from './types'

let client: NFTClient
let nfts: NFTResult[]

const scope = nock('https://example.com/')
nock.disableNetConnect()

beforeEach(() => {
  client = new NFTClient('https://example.com')
  nfts = [{ nft: { id: 'nft-id' }, order: null, rental: null } as NFTResult]
})

describe.each<[string, NFTOptions, string]>([
  ['wearable category', { category: MainCategory.WEARABLE }, 'category=wearable'],
  ['wearable subcategory', { category: WearableCategory.FEET }, 'category=wearable&wearableCategory=feet'],
  ['emote category', { category: MainCategory.EMOTE }, 'category=emote'],
  ['emote subcategory', { category: EmoteCategory.DANCE }, 'category=emote&emoteCategory=dance'],
  ['land category', { category: MainCategory.LAND }, 'isLand=true'],
  ['land subcategory', { category: LandCategory.PARCEL }, 'isLand=true&category=parcel'],
  ['ens category', { category: MainCategory.ENS }, 'category=ens'],
  ['owner', { owner: 'owner' }, 'owner=owner'],
  ['itemRarities', { itemRarities: [Rarity.COMMON, Rarity.EPIC] }, 'itemRarity=common&itemRarity=epic']
])('when requesting items with the %s option', (type, options, queryString) => {
  beforeEach(() => {
    scope.get(`/v1/nfts?${queryString}`).reply(200, {
      data: nfts
    })
  })

  it(`should request the API with the ${type} in the query string and return the resulting items`, async () => {
    const response = await client.get(options)
    expect(nock.isDone()).toBe(true)
    expect(response).toEqual({ data: nfts })
  })
})
