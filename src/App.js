import React, { Component } from 'react';
import { loadScript } from './helpers';
import MAP_API_KEY from './credentials';
import './App.css';

export default class App extends Component {
  componentDidMount = () => {
    const baseURL = 'https://maps.googleapis.com/maps/api/js?';
    // connect the initMap function to the global window
    // google maps can now invoke the function
    window.initMap = this.initMap;
    // load google maps script asynchronously
    // pass the callback reference to initMap
    loadScript(`${baseURL}key=${MAP_API_KEY}&callback=initMap`);
  };

  // initialize google map & assign coordinates
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -8.4843527, lng: 115.2633453 },
      zoom: 15,
    });
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}
