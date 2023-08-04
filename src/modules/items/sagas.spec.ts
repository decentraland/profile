import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { Item, Network } from '@dcl/schemas'
import { fetchItemsByUrnFailure, fetchItemsByUrnRequest, fetchItemsByUrnSuccess } from './actions'
import { ItemAPI } from './client'
import { itemSagas } from './sagas'

describe('when handling the fetch items by urns request', () => {
  let api: ItemAPI

  beforeEach(() => {
    api = new ItemAPI('https://api.decentraland.org/v1')
  })

  describe('and the request to the server fails', () => {
    it('should put the fetch items failure action with the error', () => {
      return expectSaga(itemSagas, api)
        .provide([
          [
            call([api, 'get'], {
              urns: ['urn:decentraland:ethereum:collections-v1:community_contest:cw_casinovisor_hat'],
              network: Network.ETHEREUM
            }),
            Promise.reject(new Error('anError'))
          ]
        ])
        .put(fetchItemsByUrnFailure('anError'))
        .dispatch(fetchItemsByUrnRequest(['urn:decentraland:ethereum:collections-v1:community_contest:cw_casinovisor_hat']))
        .silentRun()
    })
  })

  describe('and the request to the server is successful', () => {
    let itemUrns: string[]
    let items: Item[]

    describe('and the request was made with only items on the ethereum network', () => {
      beforeEach(() => {
        itemUrns = ['urn:decentraland:ethereum:collections-v1:dg_summer_2020:dg_mink_fur_coat_upper_body']
        items = [{ id: 'anId' } as Item]
      })

      it('should put the fetch items success action with the items', () => {
        return expectSaga(itemSagas, api)
          .provide([[call([api, 'get'], { urns: itemUrns, network: Network.ETHEREUM }), Promise.resolve({ data: items })]])
          .put(fetchItemsByUrnSuccess(items))
          .dispatch(fetchItemsByUrnRequest(itemUrns))
          .silentRun()
      })
    })

    describe('and the request was made with only items in the polygon network', () => {
      beforeEach(() => {
        itemUrns = ['urn:decentraland:matic:collections-v2:0x213efc9acb3f51cdb7ca208fb28b49e792441107:2']
        items = [{ id: 'anId' } as Item]
      })

      it('should put the fetch items success action with the items', () => {
        return expectSaga(itemSagas, api)
          .provide([[call([api, 'get'], { urns: itemUrns, network: Network.MATIC }), Promise.resolve({ data: items })]])
          .put(fetchItemsByUrnSuccess(items))
          .dispatch(fetchItemsByUrnRequest(itemUrns))
          .silentRun()
      })
    })

    describe('and the request was made with items in both networks', () => {
      beforeEach(() => {
        itemUrns = [
          'urn:decentraland:ethereum:collections-v1:dg_summer_2020:dg_mink_fur_coat_upper_body',
          'urn:decentraland:matic:collections-v2:0x213efc9acb3f51cdb7ca208fb28b49e792441107:2'
        ]
        items = [{ id: 'anEthereumItem' } as Item, { id: 'aPolygonItem' } as Item]
      })

      it('should put the fetch items success action with the items', () => {
        return expectSaga(itemSagas, api)
          .provide([
            [call([api, 'get'], { urns: [itemUrns[0]], network: Network.ETHEREUM }), Promise.resolve({ data: [items[0]] })],
            [call([api, 'get'], { urns: [itemUrns[1]], network: Network.MATIC }), Promise.resolve({ data: [items[1]] })]
          ])
          .put(fetchItemsByUrnSuccess(items))
          .dispatch(fetchItemsByUrnRequest(itemUrns))
          .silentRun()
      })
    })
  })
})
