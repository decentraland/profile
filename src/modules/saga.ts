import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { config } from './config'
import { translationSaga } from './translation/sagas'
import { worldSagas } from './world/sagas'
import type { MarketplaceGraphClient } from '../lib/MarketplaceGraphClient'
import type { ContentClient } from 'dcl-catalyst-client'

const analyticsSaga = createAnalyticsSaga()

export function* rootSaga(worldsContentClient: ContentClient, marketplaceGraphClient: MarketplaceGraphClient) {
  yield all([
    analyticsSaga(),
    createWalletSaga({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CHAIN_ID: Number(config.get('CHAIN_ID')),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      POLL_INTERVAL: 0,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      TRANSACTIONS_API_URL: ''
    })(),
    worldSagas(worldsContentClient, marketplaceGraphClient),
    translationSaga(),
    createProfileSaga({ peerUrl: config.get('PEER_URL') })(),
    featuresSaga({
      polling: {
        apps: [
          /* Application name here */
        ],
        delay: 60000 /** 60 seconds */
      }
    })
  ])
}
