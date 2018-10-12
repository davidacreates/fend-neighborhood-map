import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MAP_API_KEY } from '../credentials';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../helpers';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={DEFAULT_ZOOM} defaultCenter={DEFAULT_CENTER}>
      {props.isMarkerShown && <Marker position={DEFAULT_CENTER} />}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${MAP_API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
