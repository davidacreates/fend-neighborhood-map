import React, { Component } from 'react';
import axios from 'axios';
import { MAP_API_KEY } from '../credentials';
import {
  loadMap,
  MAP_BASE_URL,
  FSQUARE_REC_BASE_URL,
  FSQUARE_PHOTO_BASE_URL,
  FSQUARE_VENUE_PARAMS,
  FSQUARE_PHOTO_PARAMS,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
} from '../helpers';
import './Map.css';

export default class Map extends Component {
  state = {
    venues: [],
    photos: [],
  };

  componentDidMount = () => {
    // invoke function to get data from foursquare api
    this.getVenues();
    this.getPhotos();
  };

  displayMap = () => {
    // connect the initMap function to the global window
    // google maps can now invoke the function
    // load google maps script asynchronously
    // pass the callback reference to initMap
    loadMap(`${MAP_BASE_URL}key=${MAP_API_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  };

  // initialize google map
  // assign coordinates
  // loop through venues array and create a marker and infowindow for each venue
  // use an event listener to open and close the infowindow
  initMap = () => {
    const center = DEFAULT_CENTER;
    const zoom = DEFAULT_ZOOM;
    const { photos } = this.state;

    // create map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center,
      zoom,
    });

    // create infowindow
    const infowindow = new window.google.maps.InfoWindow();

    // cycle through venues and display on map as markers
    const { venues } = this.state;
    venues.map(v => {
      console.log(v);
      const title = v.venue.name;
      const { id } = v.venue;
      const contentString = `<h2>${title}</h2>`;
      const marker = new window.google.maps.Marker({
        position: { lat: v.venue.location.lat, lng: v.venue.location.lng },
        map,
        title,
        id,
      });
      marker.addListener('click', () => {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
      return marker;
    });
  };

  // use axios to grab select data from foursquare api
  // store the retrieved data in the places state
  // display the map on the page after the venues array is no longer empty
  getVenues = () => {
    // FIX: make sure error state displays in the browser not just console
    axios
      .get(
        `${FSQUARE_REC_BASE_URL}${new URLSearchParams(FSQUARE_VENUE_PARAMS)}`
      )
      .then(res => {
        this.setState(
          { venues: res.data.response.groups[0].items },
          this.displayMap()
        );
      })
      .catch(error => console.log(error));
  };

  getPhotos = () => {
    // FIX: make sure error state displays in the browser not just console
    // 586c81c80037eb4b10acf3f7
    axios
      .get(
        `${FSQUARE_PHOTO_BASE_URL}586c81c80037eb4b10acf3f7/photos?${new URLSearchParams(
          FSQUARE_PHOTO_PARAMS
        )}`
      )
      .then(res => {
        console.log('hi');
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}
