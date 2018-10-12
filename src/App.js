import React, { Component } from 'react';
import Map from './components/Map';
import { fsquareSearch } from './helpers';
import './App.css';

export default class App extends Component {
  componentDidMount = () => {
    fsquareSearch({
      near: 'Ubud',
      query: 'food',
      limit: 10,
    }).then(res => console.log(res));
  };

  render() {
    return (
      <div className="app">
        <Map />
      </div>
    );
  }
}
