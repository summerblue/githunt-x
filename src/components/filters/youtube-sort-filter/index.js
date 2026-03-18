import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import './styles.css';

class YoutubeSortFilter extends React.Component {
  state = {
    dropdownOpen: false
  };

  updateSort = (sortBy) => {
    if (sortBy === this.props.selectedSort) {
      return;
    }
    this.props.updateYoutubeSort(sortBy);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  getSortLabel() {
    switch (this.props.selectedSort) {
      case 'viewCount':
        return 'Most Viewed';
      case 'date':
        return 'Newest';
      case 'relevance':
        return 'Relevance';
      case 'rating':
        return 'Top Rated';
      default:
        return 'Most Viewed';
    }
  }

  render() {
    return (
      <Dropdown className='youtube-sort-wrap' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='youtube-sort-type shadowed'>
          <i className="fa fa-sort me-2"></i>
          {this.getSortLabel()}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateSort('viewCount')}>Most Viewed</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('date')}>Newest</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('relevance')}>Relevance</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('rating')}>Top Rated</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

YoutubeSortFilter.propTypes = {
  updateYoutubeSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.string
};

export default YoutubeSortFilter;
