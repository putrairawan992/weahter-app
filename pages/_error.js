import { compose } from "redux"
import Head from '../components/head'
import {Link} from '../routes'
import noAuth from '../_hoc/noAuth'
import React from 'react'
import { withNamespaces } from '../i18n'

class Error extends React.Component {
  static displayName = 'ErrorPage';
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
      namespacesRequired: ['common'],
      statusCode
    };
  }

render() {
  const { statusCode } = this.props;
  return (
    <div>
      <Head title={ statusCode.toString() } />
      <div id="page-head">
        <div className="page-title">
          <h4 className="page-header text-overflow">{ statusCode }</h4>
        </div>
      </div>

      <div id="page-content">
        <div className="card p-20">
          <div className="m-t"></div>
          <h1 className="text-center">Halaman yang Kamu cari tidak ditemukan</h1>
          <Link route="index">
            <a className="text-center">Kembali ke halaman utama</a>
          </Link>
          <div className="m-t-30"></div>
        </div>
      </div>
    </div>
  )
}
}

export default compose(
  noAuth(),
  withNamespaces(['common'])
)(Error);