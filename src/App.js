import React, { Component } from 'react';
import axios from 'axios';
import { loadMap, MAP_BASE_URL } from './helpers';
import {
  MAP_API_KEY,
  FSQUARE_CLIENT_ID,
  FSQUARE_CLIENT_SECRET,
} from './credentials';
import './App.css';

export default class App extends Component {
  state = {
    venues: [],
  };

  componentDidMount = () => {
    // invoke function to get data from foursquare api
    this.getVenues();
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
    const myLatLng = { lat: -8.5064764, lng: 115.26023 };
    const { venues } = this.state;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14,
    });
    const infowindow = new window.google.maps.InfoWindow();
    venues.map(v => {
      const title = v.venue.name;
      const contentString = title;
      const marker = new window.google.maps.Marker({
        position: { lat: v.venue.location.lat, lng: v.venue.location.lng },
        map,
        title,
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
    const FSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: FSQUARE_CLIENT_ID,
      client_secret: FSQUARE_CLIENT_SECRET,
      section: 'food',
      near: 'Ubud',
      v: 20180910,
    };

    // FIX: make sure error state displays in the browser not just console
    // TODO: limit the number of markers displayed. use react 16 tut for help.
    axios
      .get(FSQUARE_BASE_URL + new URLSearchParams(params))
      .then(res => {
        this.setState(
          { venues: res.data.response.groups[0].items },
          this.displayMap()
        );
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
