import { compose } from "redux"
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import Head from '../components/head'
import { i18n, withNamespaces } from '../i18n'
import { Link } from '../routes'
import numeral from '../utils/numeral'
import React from 'react'
import noAuth from '../_hoc/noAuth'

class Forecast extends React.Component {
  static async getInitialProps({store}) {
    const currentState = store.getState();

    return {
      namespacesRequired: ['common']
    }
  }

render() {
  const {
    t
  } = this.props;
  return (
    <div>
      <Head title={`${t('forecast')} | ${t('title')}`} />
      <h1>{t('forecast')}</h1>

    </div>
  )
}
}

const mapStateToProps = (state) => ({

})

export default compose(
  connect(mapStateToProps),
  noAuth(),
  withNamespaces(['common'])
)(Forecast);