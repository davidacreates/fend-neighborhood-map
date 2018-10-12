import React, { Component } from 'react';
import Provider, { Context } from './providers/Provider';
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
      <Provider>
        <div className="app">
          <Context.Consumer>
            {context => (
              <React.Fragment>
                <Map {...context} />
              </React.Fragment>
            )}
          </Context.Consumer>
        </div>
      </Provider>
    );
  }
}
