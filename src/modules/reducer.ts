import { combineReducers } from 'redux'
import { featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'

export const createRootReducer = () =>
  combineReducers({
    wallet,
    translation,
    modal,
    features
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
