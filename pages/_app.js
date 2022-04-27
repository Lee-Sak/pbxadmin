import { useEffect } from "react";
import "../styles/globals.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { wrapper } from "../store/store";
import { legacy_createStore as createStore } from "redux";
import { persistedReducer } from "../reducers/persist";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  useEffect(() => {
    const element = document.getElementById("__next");
    element.style.width = "100%";
    element.style.height = "100%";
  }, []);

  return (
    <PersistGate persistor={persistor} loading={<div>loading...</div>}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>PBX ADMIN</title>
      </Head>
      <Component {...pageProps} />
    </PersistGate>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(MyApp);
