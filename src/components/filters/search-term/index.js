import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GithubColors  from 'github-colors';

import './styles.css';

class SearchTerm extends React.Component {

  state = {
    value: '',
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state.value = this.props.inputSearchTerm;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);

    // this.setState({
    //   value: ,
    // });

    this.props.updateSearchTerm(this.state.value);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input placeholder="Search Term" className="search-term" type="text" value={ this.state.value } onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

SearchTerm.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
  inputSearchTerm: PropTypes.string
};

export default SearchTerm;
