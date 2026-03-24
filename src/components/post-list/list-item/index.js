import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.css';
import { isVisited, markVisited } from '../../../utils/visited';

class PostListItem extends React.Component {
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
    const subredditUrl = `https://www.reddit.com/r/${post.subreddit}`;
    const authorUrl = `https://www.reddit.com/u/${post.author}`;

    return (
      <div className={`col-12 post-list-item-container ${this.state.visited ? 'is-visited' : ''}`}>
        <div className="post-list-item-body">
          <div className="post-score-wrap">
            <i className="fa fa-arrow-up"></i>
            <span className="post-score">{this.formatCount(post.score)}</span>
          </div>
          {post.thumbnail && !post.isSelf && (
            <div className="post-thumbnail-wrap">
              <a href={post.url} rel="noopener noreferrer" target="_blank" onClick={this.handleClick}>
                <img
                  className="post-thumbnail"
                  src={post.thumbnail}
                  alt=""
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </a>
            </div>
          )}
          <div className="post-info">
            <div className="post-header">
              <h3>
                {this.state.visited && <i className="fa fa-check-circle visited-icon"></i>}
                {post.linkFlairText && (
                  <span className="post-flair">{post.linkFlairText}</span>
                )}
                <a
                  href={post.isSelf ? postUrl : post.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={this.handleClick}
                >
                  {post.title}
                </a>
                {!post.isSelf && (
                  <span className="post-domain text-muted small ms-2">({post.domain})</span>
                )}
              </h3>
              <p className="post-meta text-muted small">
                <a href={subredditUrl} rel="noopener noreferrer" target="_blank">
                  r/{post.subreddit}
                </a>
                &nbsp;&middot;&nbsp;
                <a href={authorUrl} rel="noopener noreferrer" target="_blank">
                  u/{post.author}
                </a>
                &nbsp;&middot;&nbsp;
                {moment.unix(post.createdUtc).fromNow()}
              </p>
            </div>
            {post.isSelf && post.selftext && (
              <div className="post-body">
                <p>
                  {post.selftext.length > 300
                    ? post.selftext.slice(0, 300) + '...'
                    : post.selftext}
                </p>
              </div>
            )}
            <div className="post-footer">
              <a href={postUrl} rel="noopener noreferrer" target="_blank" className="post-stat me-3" onClick={this.handleClick}>
                <i className="fa fa-comment me-1"></i>
                {this.formatCount(post.numComments)} comments
              </a>
              <span className="post-stat me-3">
                <i className="fa fa-arrow-up me-1"></i>
                {Math.round(post.upvoteRatio * 100)}% upvoted
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostListItem;
