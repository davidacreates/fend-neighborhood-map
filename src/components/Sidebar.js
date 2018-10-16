import React, { Component } from 'react';
import VenueList from './VenueList';
import SearchBar from './SearchBar';

export default class Sidebar extends Component {
  render() {
    const { filterVenueList } = this.props;
    return (
      <>
        <SearchBar {...this.props} />
        <VenueList {...this.props} venues={filterVenueList()} />
      </>
    );
  }
}
