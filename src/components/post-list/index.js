import React from 'react';
import PropTypes from 'prop-types';

import PostListItem from './list-item';

class PostList extends React.Component {
  render() {
    return (
      <div className="post-list">
        <div className="row list-container">
          {this.props.posts.map(post => (
            <PostListItem post={post} key={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
