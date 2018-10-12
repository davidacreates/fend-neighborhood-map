import React, { Component } from 'react';
import PropTypes from 'prop-types';
// make a new context
export const Context = React.createContext();

// create a provider component
// this is where the data actually lives
export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  state = {
    venues: [],
    markers: [],
    updateState: state => this.setState(state),
  };

  // returns a context provider
  // lives at the top level of the app
  // passes down state to anything this provider is wrapped in
  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={{ ...this.state }}>{children}</Context.Provider>
    );
  }
}
