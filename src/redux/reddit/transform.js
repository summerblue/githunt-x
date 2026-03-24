import { createTransform } from 'redux-persist';

const RedditTransform = createTransform(
  (inboundState, key) => {
    inboundState = inboundState || {};

    if (inboundState.posts && inboundState.posts.length > 50) {
      inboundState = {
        ...inboundState,
        posts: inboundState.posts.slice(0, 50)
      };
    }

    inboundState = {
      ...inboundState,
      processing: false,
      error: null
    };

    return inboundState;
  },
  (outboundState, key) => {
    return { ...outboundState };
  },
  {
    whitelist: ['reddit']
  }
);

export default RedditTransform;
