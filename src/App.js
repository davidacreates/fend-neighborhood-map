import React, { Component } from 'react';
import axios from 'axios';
import { loadGoogleMaps, MAP_BASE_URL } from './helpers';
import {
  MAP_API_KEY,
  FSQUARE_CLIENT_ID,
  FSQUARE_CLIENT_SECRET,
} from './credentials';
import './App.css';

export default class App extends Component {
  componentDidMount = () => {
    // invoke function to get data from foursquare
    this.getFSquareData();
    // connect the initMap function to the global window
    // google maps can now invoke the function
    window.initMap = this.initMap;
    // load google maps script asynchronously
    // pass the callback reference to initMap
    loadGoogleMaps(`${MAP_BASE_URL}key=${MAP_API_KEY}&callback=initMap`);
  };

  // initialize google map & assign coordinates
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -8.4843527, lng: 115.2633453 },
      zoom: 15,
    });
  };

  // use axios to grab select data from foursquare api
  getFSquareData = () => {
    const FSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues/explor?';
    const params = {
      client_id: FSQUARE_CLIENT_ID,
      client_secret: FSQUARE_CLIENT_SECRET,
      section: 'topPicks',
      near: 'Ubud',
      v: 20180910,
    };

    axios
      .get(FSQUARE_BASE_URL + new URLSearchParams(params))
      .then(res => console.log(res.data.response.groups[0].items))
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
