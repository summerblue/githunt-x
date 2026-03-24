import React from 'react';
import PropTypes from 'prop-types';

import PostGridItem from './grid-item';

class PostGrid extends React.Component {
  render() {
    return (
      <div className="post-grid">
        <div className="row grid-container">
          {this.props.posts.map(post => (
            <PostGridItem post={post} key={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

PostGrid.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostGrid;
