import { createFetchComponent } from '@well-known-components/fetch-component'
import { createContentClient } from 'dcl-catalyst-client'
import createSagasMiddleware from 'redux-saga'
import { PeerAPI } from 'decentraland-dapps/dist/lib/peer'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { MarketplaceGraphClient } from '../lib/MarketplaceGraphClient'
import { createRootReducer } from '../modules/reducer'
import { ReferralsClient } from '../modules/referrals/client'
import { rootSaga } from '../modules/saga'
import { createProfileSocialClient } from '../modules/social/client'

export function initTestStore(preloadedState = {}) {
  const sagasMiddleware = createSagasMiddleware()
  const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
    storageKey: 'profile', // this is the key used to save the state in localStorage (required)
    paths: [['identity', 'data']], // array of paths from state to be persisted (optional)
    actions: [], // array of actions types that will trigger a SAVE (optional)
    migrations: {} // migration object that will migrate your localstorage (optional)
  })
  const store = createRootReducer([sagasMiddleware, storageMiddleware], preloadedState)
  const worldsContentClient = createContentClient({ url: 'WORLDS_CONTENT_SERVER_URL', fetcher: createFetchComponent() })
  const marketplaceGraphClient = new MarketplaceGraphClient('MARKETPLACE_GRAPH_URL')
  const peerApi = new PeerAPI('PEER_URL')
  const socialClient = createProfileSocialClient()
  const creditsClient = new CreditsClient('CREDITS_SERVER_URL')
  const referralsClient = new ReferralsClient('REFERRAL_SERVER_URL')

  sagasMiddleware.run(rootSaga, worldsContentClient, marketplaceGraphClient, peerApi, socialClient, creditsClient, referralsClient)
  loadStorageMiddleware(store)

  return store
}
