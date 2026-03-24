import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import './styles.css';

class RedditTimeFilter extends React.Component {
  state = {
    dropdownOpen: false
  };

  updateTime = (time) => {
    if (time === this.props.selectedTime) {
      return;
    }
    this.props.updateRedditTimeFilter(time);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  getTimeLabel() {
    switch (this.props.selectedTime) {
      case 'hour':
        return 'Past Hour';
      case 'day':
        return 'Past 24 Hours';
      case 'week':
        return 'Past Week';
      case 'month':
        return 'Past Month';
      case 'year':
        return 'Past Year';
      case 'all':
        return 'All Time';
      default:
        return 'Past Week';
    }
  }

  render() {
    return (
      <Dropdown className='reddit-time-wrap' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='reddit-time-type shadowed'>
          <i className="fa fa-clock-o me-2"></i>
          {this.getTimeLabel()}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateTime('hour')}>Past Hour</DropdownItem>
          <DropdownItem onClick={() => this.updateTime('day')}>Past 24 Hours</DropdownItem>
          <DropdownItem onClick={() => this.updateTime('week')}>Past Week</DropdownItem>
          <DropdownItem onClick={() => this.updateTime('month')}>Past Month</DropdownItem>
          <DropdownItem onClick={() => this.updateTime('year')}>Past Year</DropdownItem>
          <DropdownItem onClick={() => this.updateTime('all')}>All Time</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

RedditTimeFilter.propTypes = {
  updateRedditTimeFilter: PropTypes.func.isRequired,
  selectedTime: PropTypes.string
};

export default RedditTimeFilter;
