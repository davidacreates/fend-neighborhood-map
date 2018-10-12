import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import PropTypes from 'prop-types';
import { MAP_API_KEY } from '../credentials';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  mapBaseURL,
  fsquareSearch,
} from '../helpers';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={DEFAULT_ZOOM} defaultCenter={DEFAULT_CENTER}>
      {props.markers &&
        props.markers
          .filter(m => m.isVisible)
          .map((m, index) => (
            <Marker key={index} position={{ lat: m.lat, lng: m.lng }} />
          ))}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  static propTypes = {
    updateState: PropTypes.func.isRequired,
    markers: PropTypes.array.isRequired,
  };

  componentDidMount = () => {
    fsquareSearch({
      near: 'Ubud',
      query: 'food',
      limit: 10,
    }).then(res => {
      const { venues } = res.data.response;
      const markers = venues.map(v => ({
        lat: v.location.lat,
        lng: v.location.lng,
        isOpen: false,
        isVisible: true,
      }));
      const { updateState } = this.props;
      updateState({ markers, venues });
    });
  };

  render() {
    const { markers } = this.props;
    return (
      <div>
        <MyMapComponent
          markers={markers}
          isMarkerShown
          googleMapURL={`${mapBaseURL()}key=${MAP_API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
