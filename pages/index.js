import ButtonGeolocation from '../components/button-geolocation'
import { compose } from "redux"
import { connect } from 'react-redux'
import {
  first,
  get,
  isEmpty
} from 'lodash'
import { getCookie } from '../utils/cookies'
import Head from '../components/head'
import { i18n, withNamespaces } from '../i18n'
import { kelvinToCelsius } from 'temperature'
import { Link } from '../routes'
import moment from 'moment'
import numeral from '../utils/numeral'
import PropTypes from 'prop-types'
import React from 'react'
import noAuth from '../_hoc/noAuth'
import d2d from 'degrees-to-direction'
import {
  myIp,
  saveLocation,
  setLocation,
  setLocationByIpAddress,
  getWeatherByLatLng
} from '../stores/actions'


class Index extends React.Component {
  static async getInitialProps({store, req}) {
    const currentState = store.getState();
    const coordsFromCookie = getCookie("__nw", req) || null;
    const lang = getCookie('next-i18next', req) || 'en';

    if ((!coordsFromCookie || (coordsFromCookie && coordsFromCookie.provider == 'ip-address')) && !get(currentState, 'myip.loaded') ){
      const resMyIp = await store.dispatch(myIp());
      if ( get(resMyIp, 'data.ip') ) {
        const resLocation = await store.dispatch(setLocationByIpAddress( get( resMyIp, 'data.ip' ) ))

        if ( !isEmpty(get(resLocation,'data')) ) {
          const lat = get(resLocation,'data.latitude');
          const lng = get(resLocation,'data.longitude');

          store.dispatch(setLocation(lat, lng, 'ip-address'));
          store.dispatch(saveLocation(lat, lng, 'ip-address'));
          await store.dispatch(getWeatherByLatLng( lat, lng, lang ));
        }

      }
    }

    if (coordsFromCookie) {
      await store.dispatch(getWeatherByLatLng( coordsFromCookie.latitude, coordsFromCookie.longitude, lang ));
    }

    return {
      lang,
      namespacesRequired: ['common']
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      inBrowser: false
    }
  }

  componentDidMount() {
    this.setState({ inBrowser: true });
  }

render() {
  const {
    location,
    lang,
    t,
    weather
  } = this.props;

  const {
    inBrowser
  } = this.state;
  return (
    <main>
      <Head title={`${t('current-weather')} | ${t('title')}`} />
      <div className="row justify-content-center">
        <div className="col-md-auto col-lg-6">
          <h2 className="text-center m-b-24">{t('current-weather')}</h2>
        </div>
      </div>
      {inBrowser &&
        <div className="row justify-content-center">
          <div className="col-md-auto col-lg-6">
            <ButtonGeolocation lang={lang} />
          </div>
        </div>
      }
      {!isEmpty(weather) &&
        <div className={`provider ${get(location,'provider')}`}>
          <div className="row justify-content-center m-t-16">
            <div className="col-md-auto text-center col-lg-6">
              <h3 className="text-capitalize">
                <img
                  className="main-icon"
                  alt={get(first(get(weather, 'weather')), 'description')}
                  height="36"
                  src={`/static/images/weather/${get(first(get(weather, 'weather')), 'icon')}.svg`}
                  width="36" />
                { get(first(get(weather, 'weather')), 'description') }
              </h3>
            </div>
          </div>
          <div className="row justify-content-center m-t-16">
            <div className="col-md-auto col-lg-6">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><img src="/static/images/svg/weather-1.svg" width="18" height="18"  /> Location</td>
                    <td className="td-location">{ get(weather, 'name') }</td>
                  </tr>
                  <tr>
                    <td><img src="/static/images/svg/clouds.svg" width="18" height="18"  /> Cloudiness</td>
                    <td className="text-capitalize">
                      <span>{ get(first(get(weather, 'weather')), 'description') }</span>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="/static/images/svg/temperature-1.svg" width="18" height="18"  /> Temperature</td>
                    <td className="text-capitalize">
                      <span>{ numeral(kelvinToCelsius(get(weather, 'main.temp'))).format('0,0.0') } ° Celsius</span>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="/static/images/svg/wind.svg" width="18" height="18"  /> Wind</td>
                    <td>{ numeral(get(weather, 'wind.speed')).format('0,0.00') } m/s, {d2d( get(weather, 'wind.deg') )}</td>
                  </tr>
                  <tr>
                    <td><img src="/static/images/svg/temperature-2.svg" width="18" height="18"  /> Pressure</td>
                    <td>{ numeral(get(weather, 'main.pressure')).format('0,0.00') } hpa</td>
                  </tr>
                  <tr>
                    <td><img src="/static/images/svg/hail.svg" width="18" height="18"  /> Humidity</td>
                    <td>{ numeral(get(weather, 'main.humidity')).format('0,0') } %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </main>
  )
}
}

const mapStateToProps = (state) => ({
  location: state.location.data,
  weather: state.weather.data
})

export default compose(
  connect(mapStateToProps),
  withNamespaces(['common']),
  noAuth()
)(Index);