import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import './styles.css';

class RedditSortFilter extends React.Component {
  state = {
    dropdownOpen: false
  };

  updateSort = (sort) => {
    if (sort === this.props.selectedSort) {
      return;
    }
    this.props.updateRedditSort(sort);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  getSortLabel() {
    switch (this.props.selectedSort) {
      case 'hot':
        return 'Hot';
      case 'new':
        return 'New';
      case 'top':
        return 'Top';
      case 'rising':
        return 'Rising';
      case 'controversial':
        return 'Controversial';
      default:
        return 'Hot';
    }
  }

  render() {
    return (
      <Dropdown className='reddit-sort-wrap' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='reddit-sort-type shadowed'>
          <i className="fa fa-sort me-2"></i>
          {this.getSortLabel()}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateSort('hot')}>Hot</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('new')}>New</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('top')}>Top</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('rising')}>Rising</DropdownItem>
          <DropdownItem onClick={() => this.updateSort('controversial')}>Controversial</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

RedditSortFilter.propTypes = {
  updateRedditSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.string
};

export default RedditSortFilter;
