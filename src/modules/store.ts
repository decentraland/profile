/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFetchComponent } from '@well-known-components/fetch-component'
import { createContentClient } from 'dcl-catalyst-client'
import { createLogger } from 'redux-logger'
import createSagasMiddleware from 'redux-saga'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Env } from '@dcl/ui-env'
import { PeerAPI } from 'decentraland-dapps/dist/lib/peer'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { MarketplaceGraphClient } from '../lib/MarketplaceGraphClient'
import { config } from './config'
import { createRootReducer } from './reducer'
import { ReferralsClient } from './referrals/client'
import { rootSaga } from './saga'
import { createProfileSocialClient } from './social/client'

export function initStore() {
  const sagasMiddleware = createSagasMiddleware()
  const isDev = config.is(Env.DEVELOPMENT)
  const loggerMiddleware = createLogger({
    collapsed: () => true,
    predicate: (_: any, action) => isDev || action.type.includes('Failure')
  })
  const analyticsMiddleware = createAnalyticsMiddleware(config.get('SEGMENT_API_KEY'))
  const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
    storageKey: 'profile', // this is the key used to save the state in localStorage (required)
    paths: [], // array of paths from state to be persisted (optional)
    actions: [], // array of actions types that will trigger a SAVE (optional)
    migrations: {} // migration object that will migrate your localstorage (optional)
  })
  const store = createRootReducer([sagasMiddleware, loggerMiddleware, analyticsMiddleware, storageMiddleware])
  if (isDev) {
    const _window = window as any
    // eslint-disable-next-line @typescript-eslint/unbound-method
    _window.getState = store.getState
  }

  // Create the Worlds Content client
  const worldsContentClient = createContentClient({ url: config.get('WORLDS_CONTENT_SERVER_URL'), fetcher: createFetchComponent() })
  const marketplaceGraphClient = new MarketplaceGraphClient(config.get('MARKETPLACE_GRAPH_URL'))
  const peerApi = new PeerAPI(config.get('PEER_URL'))
  const socialClient = createProfileSocialClient()

  const creditsClient = new CreditsClient(config.get('CREDITS_SERVER_URL'))
  const referralsClient = new ReferralsClient(config.get('REFERRAL_SERVER_URL'), {
    identity: () => {
      const address = getAddress(store.getState())
      const identity = address ? localStorageGetIdentity(address.toLowerCase()) : null
      return identity || undefined
    }
  })

  sagasMiddleware.run(rootSaga, worldsContentClient, marketplaceGraphClient, peerApi, socialClient, creditsClient, referralsClient)
  loadStorageMiddleware(store)

  return store
}
