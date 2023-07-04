import { all } from "redux-saga/effects";
import { featuresSaga } from "decentraland-dapps/dist/modules/features/sagas";
import { createAnalyticsSaga } from "decentraland-dapps/dist/modules/analytics/sagas";
import { createWalletSaga } from "decentraland-dapps/dist/modules/wallet/sagas";
import { createProfileSaga } from "decentraland-dapps/dist/modules/profile/sagas";
import { translationSaga } from "./translation/sagas";
import { config } from "./config";

const analyticsSaga = createAnalyticsSaga();

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    createWalletSaga({
      CHAIN_ID: Number(config.get("CHAIN_ID")),
      POLL_INTERVAL: 0,
      TRANSACTIONS_API_URL: "",
    })(),
    translationSaga(),
    createProfileSaga({ peerUrl: config.get("PEER_URL") })(),
    featuresSaga({
      polling: {
        apps: [
          /* Application name here */
        ],
        delay: 60000 /** 60 seconds */,
      },
    }),
  ]);
}
