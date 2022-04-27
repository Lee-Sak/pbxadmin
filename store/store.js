import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/root";
import { persistedReducer } from "../reducers/persist";
import { createWrapper } from "next-redux-wrapper";
import rootSaga from "../saga/index";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// Redux-Persist
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const makeConfiguredStore = (reducer) => {
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(reducer, enhancer);
};

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const a = makeConfiguredStore(rootReducer);
    sagaMiddleware.run(rootSaga);
    return a;
  } else {
    // we need it only on client side
    const store = makeConfiguredStore(persistedReducer);
    sagaMiddleware.run(rootSaga);
    let persistor = persistStore(store);
    return { persistor, ...store };
  }
};

// wrapper 로 감싸기
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
// export default { store, persistor };
