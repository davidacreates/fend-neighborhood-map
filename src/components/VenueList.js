import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VenueListItem from './VenueListItem';

export default class VenueList extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
  };

  // map over the venues array and display each venue's name as a list item
  // if the filtered venue list is not empty display the venue it contains
  // if it is empty, display the default list of venues
  render() {
    const { venues, selectVenueListItem } = this.props;

    return (
      <>
        <ol className="venueList">
          {venues &&
            venues.map((v, index) => (
              <VenueListItem
                key={index}
                {...v}
                selectVenueListItem={selectVenueListItem}
              />
            ))}
        </ol>
      </>
    );
  }
}
