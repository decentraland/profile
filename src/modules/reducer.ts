import { combineReducers } from 'redux'
import { featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { profileReducer as profile } from 'decentraland-dapps/dist/modules/profile/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist/modules/storage/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'

export const createRootReducer = () =>
  combineReducers({
    wallet,
    storage,
    translation,
    modal,
    features,
    profile
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
