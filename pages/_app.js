import React from "react";
import App, { Container } from "next/app";
import "../static/asserts/styles.less";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Layout from "../components/Layout";

import createStore from "../store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx, isServer }) {
    let pageProps = {};
    let { pathname } = ctx;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx, isServer });
    }

    return { pageProps, pathname, isServer };
  }

  render() {
    const { Component, pageProps, store, pathname, isServer } = this.props;
    return (
      <Container>
        <Provider store={store}>
          {pathname === "/login" ? (
            <Component {...pageProps} />
          ) : pathname === "/register" ? (
            <Component {...pageProps} />
          ) : (
            <Layout isServer={isServer}>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
