import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagasMiddleware from "redux-saga";
import { Env } from "@dcl/ui-env";
import { createAnalyticsMiddleware } from "decentraland-dapps/dist/modules/analytics/middleware";
import { config } from "./config";
import { rootSaga } from "./saga";
import { createRootReducer } from "./reducer";

export function initStore() {
  const sagasMiddleware = createSagasMiddleware();
  const isDev = config.is(Env.DEVELOPMENT);
  const loggerMiddleware = createLogger({
    collapsed: () => true,
    predicate: (_: any, action) => isDev || action.type.includes("Failure"),
  });
  const analyticsMiddleware = createAnalyticsMiddleware(
    config.get("SEGMENT_API_KEY")
  );
  const middleware = applyMiddleware(
    sagasMiddleware,
    loggerMiddleware,
    analyticsMiddleware
  );
  const composeEnhancers =
    isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : compose;
  const enhancer = composeEnhancers(middleware);

  const store = createStore(createRootReducer(), enhancer);

  if (isDev) {
    const _window = window as any;
    _window.getState = store.getState;
  }

  sagasMiddleware.run(rootSaga);

  return store;
}
