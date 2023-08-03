import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { Item } from '@dcl/schemas'
import { ItemAPI } from '../clients/items'
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from './actions'
import { itemSagas } from './sagas'

describe('when handling the fetch items request', () => {
  let api: ItemAPI

  beforeEach(() => {
    api = new ItemAPI('https://api.decentraland.org/v1')
  })

  describe('and the request to the server fails', () => {
    it('should put the fetch items failure action with the error', () => {
      return expectSaga(itemSagas, api)
        .provide([[call([api, 'get'], { ids: ['anId'] }), Promise.reject(new Error('anError'))]])
        .put(fetchItemsFailure('anError'))
        .dispatch(fetchItemsRequest(['anId']))
        .silentRun()
    })
  })

  describe('and the request to the server is successful', () => {
    it('should put the fetch items success action with the items', () => {
      return expectSaga(itemSagas, api)
        .provide([[call([api, 'get'], { ids: ['anId'] }), Promise.resolve({ data: [{ id: 'anId' }] })]])
        .put(fetchItemsSuccess([{ id: 'anId' } as Item]))
        .dispatch(fetchItemsRequest(['anId']))
        .silentRun()
    })
  })
})
