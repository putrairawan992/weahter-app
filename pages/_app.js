import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../stores";
import "normalize.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/styles.scss';
import '../styles/animate.css';
import Router from "next/router";
import NProgress from "nprogress";
import Alert from 'react-s-alert';
import { appWithTranslation } from '../i18n'

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", url => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", url => {
  NProgress.done();
  window.scrollTo(0, 0);
});
Router.events.on("routeChangeError", () => NProgress.done());

export default withRedux(initStore)(appWithTranslation(
  class NextWeather extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      };
    }

    componentDidMount(){
      if (window.Cypress) {
        window.store = this.props.store;
      }
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
              <Component {...pageProps} />
              <Alert stack={{limit: 3}} />
          </Provider>
        </Container>
      );
    }
  }
));
