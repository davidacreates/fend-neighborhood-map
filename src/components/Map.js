import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
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
        props.markers.filter(m => m.isVisible).map((m, index) => {
          const venueDetails = props.venues.find(v => v.id === m.id);
          return (
            <Marker
              key={index}
              position={{ lat: m.lat, lng: m.lng }}
              onClick={() => props.openInfoWindow(m)}
            >
              {m.isOpen &&
                venueDetails.bestPhoto && (
                  <InfoWindow>
                    <>
                      <img
                        src={`${venueDetails.bestPhoto.prefix}100x100${
                          venueDetails.bestPhoto.suffix
                        }`}
                        alt={venueDetails.name}
                      />
                      <p>{venueDetails.name}</p>
                      <p>{venueDetails.location.address}</p>
                    </>
                  </InfoWindow>
                )}
            </Marker>
          );
        })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  static propTypes = {
    updateState: PropTypes.func.isRequired,
    markers: PropTypes.array.isRequired,
    venues: PropTypes.array.isRequired,
    openInfoWindow: PropTypes.func.isRequired,
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
        id: v.id,
        isOpen: false,
        isVisible: true,
      }));
      const { updateState } = this.props;
      updateState({ markers, venues });
    });
  };

  render() {
    const { markers, venues, openInfoWindow } = this.props;
    return (
      <div>
        <MyMapComponent
          openInfoWindow={openInfoWindow}
          markers={markers}
          venues={venues}
          isMarkerShown
          googleMapURL={`${mapBaseURL()}key=${MAP_API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
