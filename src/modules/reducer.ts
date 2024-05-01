import { configureStore, Reducer, Middleware, AnyAction, combineReducers, Store } from '@reduxjs/toolkit'
import { FeaturesState, featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { ModalState, modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { StorageState, storageReducer as storage, storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { TransactionState, transactionReducer as transaction } from 'decentraland-dapps/dist/modules/transaction/reducer'
import { TranslationState, translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { WalletState, walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'
import { IdentityState, identityReducer as identity } from './identity/reducer'
import { ItemsState, itemsReducer as items } from './items/reducer'
import { NFTsState, nftsReducer as nfts } from './nfts/reducer'
import { profileReducer as profile } from './profile/reducer'
import { ProfileState } from './profile/types'
import { SocialState, socialReducer as social } from './social/reducer'
import { SubscriptionSettingsState, subscriptionSettingsReducer as subscriptionSettings } from './subscriptionSettings/reducer'
import { WorldState, worldReducer as world } from './world/reducer'

export const createRootReducer = (middlewares: Middleware[], preloadedState = {}) =>
  configureStore({
    reducer: storageReducerWrapper(
      combineReducers<RootState>({
        wallet,
        storage,
        modal: modal as Reducer<ModalState, AnyAction>,
        features: features as Reducer<FeaturesState, AnyAction>,
        translation: translation as Reducer<TranslationState, AnyAction>,
        profile,
        identity,
        social,
        world,
        items,
        nfts,
        transaction,
        subscriptionSettings
      })
    ),
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['[Request] Login', '[Success] Login', 'Open modal', 'REDUX_PERSISTENCE_SAVE', 'REDUX_PERSISTENCE_LOAD'],
          ignoredPaths: ['modal', 'identity']
        }
      }).concat(middlewares)
  })

// We need to build the Store type manually due to the storageReducerWrapper function not propagating the type correctly
export type RootState = {
  identity: IdentityState
  world: WorldState
  modal: ModalState
  profile: ProfileState
  social: SocialState
  storage: StorageState
  translation: TranslationState
  wallet: WalletState
  features: FeaturesState
  items: ItemsState
  nfts: NFTsState
  transaction: TransactionState
  subscriptionSettings: SubscriptionSettingsState
}

export type RootStore = Store<RootState>
export type RootReducer = Reducer<RootState>
