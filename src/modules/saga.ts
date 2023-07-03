import { all } from "redux-saga/effects";
import { featuresSaga } from "decentraland-dapps/dist/modules/features/sagas";
import { createAnalyticsSaga } from "decentraland-dapps/dist/modules/analytics/sagas";

const analyticsSaga = createAnalyticsSaga();

export function* rootSaga() {
  yield all([
    analyticsSaga(),
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
