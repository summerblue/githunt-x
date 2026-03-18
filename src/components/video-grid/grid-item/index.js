import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.css';
import { isVisited, markVisited } from '../../../utils/visited';

class VideoGridItem extends React.Component {
  state = {
    visited: isVisited('yt-' + this.props.video.id)
  };

  handleClick = () => {
    markVisited('yt-' + this.props.video.id);
    this.setState({ visited: true });
  };

  formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

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
    const { video } = this.props;
    const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
    const channelUrl = `https://www.youtube.com/channel/${video.channelId}`;

    return (
      <div className={`col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 video-grid-item-container ${this.state.visited ? 'is-visited' : ''}`}>
        <div className="video-grid-item-body">
          <div className="video-grid-thumbnail-wrap">
            <a href={videoUrl} rel="noopener noreferrer" target="_blank" onClick={this.handleClick}>
              <img
                className="video-grid-thumbnail"
                src={video.thumbnail.url}
                alt={video.title}
              />
              <span className="video-grid-duration">{this.formatDuration(video.duration)}</span>
            </a>
            {this.state.visited && <span className="video-grid-visited-badge"><i className="fa fa-check"></i></span>}
          </div>
          <div className="video-grid-info">
            <h5>
              <a href={videoUrl} rel="noopener noreferrer" target="_blank" onClick={this.handleClick}>
                {video.title.length > 60 ? video.title.slice(0, 60) + '...' : video.title}
              </a>
            </h5>
            <p className="video-grid-channel text-muted small">
              <a href={channelUrl} rel="noopener noreferrer" target="_blank">
                {video.channelTitle}
              </a>
              &nbsp;&middot;&nbsp;
              {moment(video.publishedAt).fromNow()}
            </p>
            <div className="video-grid-stats">
              <span className="me-3">
                <i className="fa fa-eye me-1"></i>
                {this.formatCount(video.viewCount)}
              </span>
              <span className="me-3">
                <i className="fa fa-thumbs-up me-1"></i>
                {this.formatCount(video.likeCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoGridItem.propTypes = {
  video: PropTypes.object.isRequired
};

export default VideoGridItem;
