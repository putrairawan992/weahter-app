import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { get, isEmpty } from 'lodash'
import { getCookie } from '../utils/cookies'
import Layout from '../components/layout'
import Router from 'next/router'
import { setLocation } from "../stores/actions";


const withoutAuthentication = (permissions = [], layoutClass = "") => NoAuthComponent =>
  class Auth extends React.Component {
    static async getInitialProps(context) {
      const { req, res, store, isServer, asPath } = context;
      const coordsFromCookie = getCookie("__nw", req) || null;

      let initialProps = {};

      if (coordsFromCookie) {
        store.dispatch(setLocation(coordsFromCookie.lat, coordsFromCookie.lng));
      }

      if (NoAuthComponent.getInitialProps) {
        initialProps = await NoAuthComponent.getInitialProps(context);
      }

      return { ...initialProps, asPath };
    }
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        layoutClass: layoutClass
      };
    }

    render() {
      const { isLoading, layoutClass } = this.state;
      return (
          <Layout asPath={this.props.asPath}>
            <NoAuthComponent {...this.props} />
          </Layout>
        )
    }
  };

const noAuth = (component, permissions) =>
  compose(
    withoutAuthentication(component, permissions)
  );

export default noAuth;
