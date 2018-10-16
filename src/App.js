import React, { Component } from 'react';
import Provider, { Context } from './providers/Provider';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      // any child of this provider (can be as far down the chain as you want)
      // will be able to access the data / state from the provider
      // the consumer is how the data can be accessed
      <Provider>
        <div className="app">
          <Context.Consumer>
            {context => (
              // TODO: only pass down the states/props I end up using for each component
              // uses react fragment shortcut syntax
              <>
                <Sidebar {...context} />
                <Map {...context} />
              </>
            )}
          </Context.Consumer>
        </div>
      </Provider>
    );
  }
}
