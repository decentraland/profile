import { ContentClient } from 'dcl-catalyst-client'
import PQueue from 'p-queue'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Entity, Scene } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { MarketplaceGraphClient } from '../../lib/MarketplaceGraphClient'
import { fetchWorldsRequest, fetchWorldsSuccess, fetchWorldsFailure, FetchWorldsRequestAction } from './actions'
import { World } from './types'

const REQUESTS_BATCH_SIZE = 5

export function* worldSagas(worldsContentClient: ContentClient, marketplaceGraphClient: MarketplaceGraphClient) {
  yield takeEvery(fetchWorldsRequest.type, handleFetchWorldsRequest)

  function* handleFetchWorldsRequest(action: FetchWorldsRequestAction) {
    const address = action.payload

    try {
      const domains: string[] = yield call([marketplaceGraphClient, 'fetchENSList'], address)
      const queue = new PQueue({ concurrency: REQUESTS_BATCH_SIZE })
      const domainWorldDeployments = domains.map(domain => async () => {
        try {
          const fullDomain = `${domain}.dcl.eth`
          const deploymentEntity: Entity[] = await worldsContentClient.fetchEntitiesByPointers([fullDomain])
          const worldDeployment = deploymentEntity[0]
          const scene = deploymentEntity[0].metadata as Scene
          const isEmpty = !!(scene && scene.source && scene.source.isEmpty)

          return {
            domain: fullDomain,
            owner: address,
            deployTime: worldDeployment.timestamp,
            active: !isEmpty
          }
        } catch (error) {
          return { domain, active: false }
        }
      })
      const worlds: World[] = yield queue.addAll(domainWorldDeployments)
      yield put(fetchWorldsSuccess(worlds))
    } catch (error) {
      yield put(fetchWorldsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
