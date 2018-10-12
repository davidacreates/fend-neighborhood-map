import React, { Component } from 'react';
import PropTypes from 'prop-types';
// make a new context
export const Context = React.createContext();

// create a provider component
export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  state = {
    venues: [],
    markers: [],
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={{ ...this.state }}>{children}</Context.Provider>
    );
  }
}
