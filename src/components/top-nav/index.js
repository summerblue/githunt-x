import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Logo from '../icons/logo';

class TopNav extends React.Component {
  tweet = 'GitHunt – Most starred projects on Github by @kamranahmedse https://github.com/kamranahmedse/githunt';

  toggleTheme = () => {
    const newTheme = this.props.theme === 'dark' ? 'light' : 'dark';
    this.props.updateTheme(newTheme);
  };

  render() {
    const isRunningExtension = window.chrome &&
      window.chrome.runtime &&
      window.chrome.runtime.id;

    const isYouTube = this.props.activePlatform === 'youtube';
    const isReddit = this.props.activePlatform === 'reddit';
    const isDark = this.props.theme === 'dark';

    return (
      <div className='top-nav'>
        <div className="container clearfix">
          <a href='https://github.com/kamranahmedse/githunt'
             rel="noopener noreferrer"
             target='_blank'
             className="logo clearfix float-start">
            { !isYouTube && !isReddit && <Logo/> }
            { isYouTube && (
              <div className="youtube-logo-icon">
                <i className="fa fa-youtube-play"></i>
              </div>
            )}
            { isReddit && (
              <div className="reddit-logo-icon">
                <i className="fa fa-reddit-alien"></i>
              </div>
            )}
            <div className="logo-text">
              <h4>{ isReddit ? 'Reddit' : isYouTube ? 'YouTube' : 'GitHunt' }</h4>
              <p className="text-muted d-none d-sm-inline-block d-md-inline-block d-xl-inline-block d-lg-inline-block">
                { isReddit ? 'Browse Reddit posts' : isYouTube ? 'Trending videos across YouTube' : 'Most starred projects on GitHub' }
              </p>
              <p className="text-muted d-inline-block d-sm-none d-md-none d-xl-none d-lg-none">
                { isReddit ? 'Reddit Posts' : isYouTube ? 'Trending Videos' : 'Top Github Projects' }
              </p>
            </div>
          </a>
          <div className="float-end external-btns">
            <button className="btn btn-outline-secondary btn-theme-toggle"
                    onClick={ this.toggleTheme }
                    title={ isDark ? 'Switch to light mode' : 'Switch to dark mode' }>
              <i className={ `fa ${isDark ? 'fa-sun-o' : 'fa-moon-o'}` }></i>
            </button>
            <a href='http://github.com/kamranahmedse/githunt'
               target='_blank'
               rel="noopener noreferrer"
               className="btn btn-outline-secondary d-none d-sm-none d-md-inline-block d-xl-inline-block d-lg-inline-block"><i className="fa fa-github me-1"></i> View Source</a>
            {
              !isRunningExtension && (
                <a href='https://goo.gl/e7YP1h'
                   target='_blank'
                   rel="noopener noreferrer"
                   className="btn btn-outline-secondary d-none d-sm-none d-md-inline-block d-xl-inline-block d-lg-inline-block">
                  <i className="fa fa-chrome me-1"></i> Use Extension
                </a>
              )
            }
            {
              isRunningExtension && (
                <a href='https://twitter.com/kamranahmedse'
                   target='_blank'
                   rel="noopener noreferrer"
                   className="btn btn-outline-secondary d-none d-sm-none d-md-inline-block d-xl-inline-block d-lg-inline-block">
                  <i className="fa fa-comment me-1"></i> Give Feedback
                </a>
              )
            }
            <a href={ `https://twitter.com/intent/tweet?text=${this.tweet}` }
               target='_blank'
               rel="noopener noreferrer"
               className="btn btn-outline-secondary d-none d-sm-none d-md-none d-xl-inline-block d-lg-inline-block">
                <i className="fa fa-twitter me-1"></i> Tweet
            </a>
          </div>
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  activePlatform: PropTypes.string,
  theme: PropTypes.string,
  updateTheme: PropTypes.func,
};

export default TopNav;
