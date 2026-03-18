import React from 'react';
import PropTypes from 'prop-types';

import VideoGridItem from './grid-item';

class VideoGrid extends React.Component {
  render() {
    return (
      <div className="video-grid">
        <div className="row grid-container">
          {this.props.videos.map(video => (
            <VideoGridItem video={video} key={video.id} />
          ))}
        </div>
      </div>
    );
  }
}

VideoGrid.propTypes = {
  videos: PropTypes.array.isRequired
};

export default VideoGrid;
