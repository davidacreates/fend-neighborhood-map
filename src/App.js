import React, { Component } from 'react';
import { loadScript } from './helpers';
import './App.css';

export default class App extends Component {
  componentDidMount = () => {
    const baseURL = 'https://maps.googleapis.com/maps/api/js?';
    const API = 'AIzaSyAYWYxiUDePggeSPxYRnQt-2PCeQ0IJ6lA';
    // load google maps script asynchronously
    loadScript(`${baseURL}key=${API}&callback=initMap`);
    // display the map on the page
    window.initMap = this.initMap;
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
