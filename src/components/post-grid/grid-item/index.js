import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.css';
import { isVisited, markVisited } from '../../../utils/visited';

class PostGridItem extends React.Component {
  state = {
    visited: isVisited('rd-' + this.props.post.id)
  };

  handleClick = () => {
    markVisited('rd-' + this.props.post.id);
    this.setState({ visited: true });
  };

  formatCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toLocaleString();
  }

  render() {
    const { post } = this.props;
    const postUrl = `https://www.reddit.com${post.permalink}`;

    return (
      <div className={`col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 post-grid-item-container ${this.state.visited ? 'is-visited' : ''}`}>
        <div className="post-grid-item-body">
          {post.preview && (
            <div className="post-grid-thumbnail-wrap">
              <a href={post.isSelf ? postUrl : post.url} rel="noopener noreferrer" target="_blank" onClick={this.handleClick}>
                <img
                  className="post-grid-thumbnail"
                  src={post.preview}
                  alt=""
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </a>
              {this.state.visited && <span className="post-grid-visited-badge"><i className="fa fa-check"></i></span>}
              <span className="post-grid-score">
                <i className="fa fa-arrow-up me-1"></i>
                {this.formatCount(post.score)}
              </span>
            </div>
          )}
          {!post.preview && (
            <div className="post-grid-no-thumbnail">
              <span className="post-grid-self-icon">
                <i className="fa fa-file-text-o"></i>
              </span>
              {this.state.visited && <span className="post-grid-visited-badge"><i className="fa fa-check"></i></span>}
              <span className="post-grid-score">
                <i className="fa fa-arrow-up me-1"></i>
                {this.formatCount(post.score)}
              </span>
            </div>
          )}
          <div className="post-grid-info">
            <h5>
              <a href={post.isSelf ? postUrl : post.url} rel="noopener noreferrer" target="_blank" onClick={this.handleClick}>
                {post.title.length > 80 ? post.title.slice(0, 80) + '...' : post.title}
              </a>
            </h5>
            <p className="post-grid-meta text-muted small">
              r/{post.subreddit}
              &nbsp;&middot;&nbsp;
              u/{post.author}
              &nbsp;&middot;&nbsp;
              {moment.unix(post.createdUtc).fromNow()}
            </p>
            <div className="post-grid-stats">
              <span className="me-3">
                <i className="fa fa-comment me-1"></i>
                {this.formatCount(post.numComments)}
              </span>
              <span>
                <i className="fa fa-arrow-up me-1"></i>
                {Math.round(post.upvoteRatio * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostGridItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostGridItem;
