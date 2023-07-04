import { combineReducers } from "redux";
import { walletReducer as wallet } from "decentraland-dapps/dist/modules/wallet/reducer";
import { translationReducer as translation } from "decentraland-dapps/dist/modules/translation/reducer";
import { modalReducer as modal } from "decentraland-dapps/dist/modules/modal/reducer";
import { featuresReducer as features } from "decentraland-dapps/dist/modules/features/reducer";
import { storageReducer as storage } from "decentraland-dapps/dist/modules/storage/reducer";

export const createRootReducer = () =>
  combineReducers({
    wallet,
    storage,
    translation,
    modal,
    features,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
