import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { config } from './config'
import { translationSaga } from './translation/sagas'

const analyticsSaga = createAnalyticsSaga()

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    createWalletSaga({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CHAIN_ID: Number(config.get('CHAIN_ID')),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      POLL_INTERVAL: 0
    })(),
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
