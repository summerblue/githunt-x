import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import './styles.css';

class DateJumpFilter extends React.Component {
  state = {
    dropdownOpen: false
  };

  updateDateJump = (dateJump) => {
    if (dateJump === this.props.selectedDateJump) {
      return;
    }

    this.props.updateDateJump(dateJump);
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  getSelectedDateJump() {
    switch (this.props.selectedDateJump) {
      case 'day':
        return 'Daily';
      case 'month':
        return 'Monthly';
      case '3-months':
        return '3 Months';
      case '2-months':
        return '2 Months';
      case '6-months':
        return '6 Months';
      case '2-years':
        return '2 Years';
      case '10-years':
        return '10 Years';
      case '20-years':
        return '20 Years';
      case '3-years':
        return '3 Years';
      case '5-years':
        return '5 Years';
      case 'year':
        return 'Yearly';
      case 'week':
        return 'Weekly';
      case 'week':
        return 'Weekly';
      case 'week':
        return 'Weekly';
      case 'week':
        return 'Weekly';
      case 'week':
        return 'Weekly';
      default:
        return 'Weekly';
    }
  }

  render() {
    return (
      <Dropdown className='date-jump-wrap' isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
        <DropdownToggle className='date-jump-type shadowed'>
          <i className="fa fa-calendar mr-2"></i>
          { this.getSelectedDateJump() }
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={ () => this.updateDateJump('20-years') }>20 Years</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('10-years') }>10 Years</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('5-years') }>5 Years</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('3-years') }>3 Years</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('2-years') }>2 Years</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('year') }>Yearly</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('6-months') }>6 Months</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('3-months') }>3 Months</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('2-months') }>2 Months</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('month') }>Monthly</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('week') }>Weekly</DropdownItem>
          <DropdownItem onClick={ () => this.updateDateJump('day') }>Daily</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DateJumpFilter.propTypes = {
  updateDateJump: PropTypes.func.isRequired,
  selectedDateJump: PropTypes.string
};

export default DateJumpFilter;
