import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const STORAGE_KEY = 'githunt:subreddit-history';

function getSubredditHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function recordSubreddit(name) {
  const history = getSubredditHistory();
  const key = name.toLowerCase();
  history[key] = (history[key] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getFrequentSubreddits() {
  const history = getSubredditHistory();
  return Object.entries(history)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

class SubredditInput extends React.Component {
  state = {
    value: this.props.subreddit || 'popular',
    frequents: getFrequentSubreddits(),
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const val = this.state.value.trim() || 'popular';
    recordSubreddit(val);
    this.setState({ frequents: getFrequentSubreddits() });
    this.props.updateRedditSubreddit(val);
  };

  handleFrequentClick = (name) => {
    this.setState({ value: name });
    recordSubreddit(name);
    this.setState({ frequents: getFrequentSubreddits() });
    this.props.updateRedditSubreddit(name);
  };

  render() {
    const { frequents } = this.state;
    const current = (this.props.subreddit || 'popular').toLowerCase();

    return (
      <div className="subreddit-input-wrap">
        <form onSubmit={this.handleSubmit} className="subreddit-input-form">
          <span className="subreddit-prefix">r/</span>
          <input
            placeholder="popular"
            className="subreddit-input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        {frequents.length > 0 && (
          <div className="subreddit-frequents">
            {frequents.map(name => (
              <button
                key={name}
                className={`subreddit-tag ${name === current ? 'active' : ''}`}
                onClick={() => this.handleFrequentClick(name)}
              >
                r/{name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

SubredditInput.propTypes = {
  updateRedditSubreddit: PropTypes.func.isRequired,
  subreddit: PropTypes.string
};

export default SubredditInput;
