import React from 'react';
import PropTypes from 'prop-types';

import VideoListItem from './list-item';

class VideoList extends React.Component {
  render() {
    return (
      <div className="video-list">
        <div className="row list-container">
          {this.props.videos.map(video => (
            <VideoListItem video={video} key={video.id} />
          ))}
        </div>
      </div>
    );
  }
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired
};

export default VideoList;
