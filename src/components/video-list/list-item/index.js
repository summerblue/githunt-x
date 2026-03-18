import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.css';

class VideoListItem extends React.Component {
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
      <div className="col-12 video-list-item-container">
        <div className="video-list-item-body">
          <div className="video-thumbnail-wrap">
            <a href={videoUrl} rel="noopener noreferrer" target="_blank">
              <img
                className="video-thumbnail"
                src={video.thumbnail.url}
                alt={video.title}
              />
              <span className="video-duration">{this.formatDuration(video.duration)}</span>
            </a>
          </div>
          <div className="video-info">
            <div className="video-header">
              <h3>
                <a href={videoUrl} rel="noopener noreferrer" target="_blank">
                  {video.title}
                </a>
              </h3>
              <p className="video-meta text-muted small">
                <a href={channelUrl} rel="noopener noreferrer" target="_blank">
                  {video.channelTitle}
                </a>
                &nbsp;&middot;&nbsp;
                {moment(video.publishedAt).fromNow()}
              </p>
            </div>
            <div className="video-body">
              <p title={video.description}>
                {video.description && video.description.length > 300
                  ? video.description.slice(0, 300) + '...'
                  : video.description || 'No description.'}
              </p>
            </div>
            <div className="video-footer">
              <span className="video-stat me-3">
                <i className="fa fa-eye me-1"></i>
                {this.formatCount(video.viewCount)}
              </span>
              <span className="video-stat me-3">
                <i className="fa fa-thumbs-up me-1"></i>
                {this.formatCount(video.likeCount)}
              </span>
              <span className="video-stat me-3">
                <i className="fa fa-comment me-1"></i>
                {this.formatCount(video.commentCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired
};

export default VideoListItem;
