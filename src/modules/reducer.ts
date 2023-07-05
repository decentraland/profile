import { configureStore, Reducer, Middleware, AnyAction } from '@reduxjs/toolkit'
import { FeaturesState, featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { ModalState, modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { profileReducer as profile } from 'decentraland-dapps/dist/modules/profile/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist/modules/storage/reducer'
import { TranslationState, translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'

export const createRootReducer = (middlewares: Middleware[]) =>
  configureStore({
    reducer: {
      wallet,
      storage,
      modal: modal as Reducer<ModalState, AnyAction>,
      features: features as Reducer<FeaturesState, AnyAction>,
      translation: translation as Reducer<TranslationState, AnyAction>,
      profile
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(middlewares)
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>['getState']>
export type Dispatch = ReturnType<typeof createRootReducer>['dispatch']
