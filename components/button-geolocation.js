import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { get, isEmpty, isEqual } from 'lodash'
import { geolocated } from 'react-geolocated'
import {
  getWeatherByLatLng,
  saveLocation,
  setLocation
} from '../stores/actions'
import React from 'react'

class ButtonGeolocation extends React.Component {

  componentDidUpdate( prevProps, prevState ) {
    if ( this.props.coords != null ){
      const {
        coords,
        getWeatherByLatLng,
        lang,
        saveLocation,
        setLocation
      } = this.props;
      const lat = get(coords, 'latitude');
      const lng = get(coords, 'longitude');
      saveLocation(lat, lng, 'geolocation');
      setLocation(lat, lng, 'geolocation');
      getWeatherByLatLng(lat, lng, lang);
    }
  }

  render() {
    const {
      coords,
      getLocation,
      isGeolocationAvailable,
      isGeolocationEnabled
    } = this.props;
    return (
      <div>
        {/*<button className="btn btn-primary" onClick={getLocation}><i className="zmdi zmdi-my-location"></i></button>*/}
        {/*<p>{ isGeolocationAvailable ? 'available' : 'unavailable' }</p>
        <p>{ isGeolocationEnabled ? 'enabled' : 'disabled' }</p>
        <p>{ coords ? `allowed (lat,lng): ${coords.latitude}, ${coords.longitude} ` : 'unallowed' }</p>*/}
      </div>
    )
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  getWeatherByLatLng: bindActionCreators( getWeatherByLatLng, dispatch ),
  saveLocation: bindActionCreators( saveLocation, dispatch ),
  setLocation: bindActionCreators( setLocation, dispatch )
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000
  })
)(ButtonGeolocation);