import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Sidebar extends React.Component {
  render() {
    const { activePlatform, updatePlatform } = this.props;

    return (
      <div className="sidebar">
        <div
          className={`sidebar-item ${activePlatform === 'github' ? 'active' : ''}`}
          onClick={() => updatePlatform('github')}
          title="GitHunt"
        >
          <i className="fa fa-github"></i>
          <span className="sidebar-label">GitHunt</span>
        </div>
        <div
          className={`sidebar-item ${activePlatform === 'youtube' ? 'active' : ''}`}
          onClick={() => updatePlatform('youtube')}
          title="YouTube"
        >
          <i className="fa fa-youtube-play"></i>
          <span className="sidebar-label">YouTube</span>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  activePlatform: PropTypes.string.isRequired,
  updatePlatform: PropTypes.func.isRequired,
};

export default Sidebar;
