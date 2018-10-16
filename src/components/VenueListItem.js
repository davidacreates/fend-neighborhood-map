import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VenueListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    selectVenueListItem: PropTypes.func.isRequired,
  };

  render() {
    const { name, selectVenueListItem } = this.props;
    return (
      <>
        <li className="venue" onClick={() => selectVenueListItem(this.props)}>
          {name}
        </li>
      </>
    );
  }
}
