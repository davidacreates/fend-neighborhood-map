import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  static propTypes = {
    updateState: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    venues: PropTypes.array.isRequired,
    markers: PropTypes.array.isRequired,
  };

  // capture the input query and update the state
  // match the venue name(s) to the query
  // get the marker that is associated with each venue
  // update the marker visibility state based on the isMatch boolean
  // update the overall markers state to reflect the new state of the updated markers
  handleChange = e => {
    let { updateState, query, venues, markers } = this.props;
    query = e.target.value;
    updateState({ query });

    const updatedMarkers = venues.map(v => {
      const venueName = v.name.toLowerCase();
      const isMatch = venueName.includes(query.toLowerCase());
      const marker = markers.find(m => m.id === v.id);
      if (isMatch) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    updateState({ markers: [...markers], updatedMarkers });
  };

  render() {
    return (
      <>
        <input
          type="search"
          name="search"
          id="searchFilter"
          placeholder="Filter Venues List"
          onChange={this.handleChange}
        />
      </>
    );
  }
}
