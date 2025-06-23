import type { ContentClient } from 'dcl-catalyst-client'
import { all } from 'redux-saga/effects'
import type { PeerAPI } from 'decentraland-dapps/dist/lib/peer'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { creditsSaga } from 'decentraland-dapps/dist/modules/credits/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import type { MarketplaceGraphClient } from '../lib/MarketplaceGraphClient'
import { config } from './config'
import { identitySaga } from './identity/sagas'
import { ItemsClient } from './items/client'
import { itemSagas } from './items/sagas'
import { modalSagas } from './modal/sagas'
import { NFTClient } from './nfts/client'
import { nftSagas } from './nfts/sagas'
import { createProfileSaga } from './profile/sagas'
import { ReferralsClient } from './referrals/client'
import { referralsSagas } from './referrals/sagas'
import { socialSagas } from './social/sagas'
import { translationSaga } from './translation/sagas'
import { worldSagas } from './world/sagas'

const analyticsSaga = createAnalyticsSaga()
export const NFT_SERVER_URL = config.get('NFT_SERVER_URL')
export const MARKETPLACE_SERVER_URL = config.get('MARKETPLACE_SERVER_URL')
export const REFERRAL_SERVER_URL = config.get('REFERRAL_SERVER_URL')

export function* rootSaga(
  worldsContentClient: ContentClient,
  marketplaceGraphClient: MarketplaceGraphClient,
  peerApi: PeerAPI,
  creditsClient: CreditsClient,
  referralsClient: ReferralsClient
) {
  yield all([
    analyticsSaga(),
    createWalletSaga({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CHAIN_ID: Number(config.get('CHAIN_ID')),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      POLL_INTERVAL: 0,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      TRANSACTIONS_API_URL: 'https://transactions-api.decentraland.org/v1'
    })(),
    worldSagas(worldsContentClient, marketplaceGraphClient),
    translationSaga(),
    creditsSaga({ creditsClient }),
    identitySaga(),
    modalSagas(),
    itemSagas(new ItemsClient(MARKETPLACE_SERVER_URL)),
    socialSagas(),
    createProfileSaga(marketplaceGraphClient, peerApi)(),
    featuresSaga({
      polling: {
        apps: [ApplicationName.PROFILE, ApplicationName.DAPPS],
        delay: 60000 /** 60 seconds */
      }
    }),
    nftSagas(new NFTClient(NFT_SERVER_URL)),
    transactionSaga(),
    referralsSagas(referralsClient)
  ])
}
