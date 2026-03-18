import { createTransform } from 'redux-persist';

const YoutubeTransform = createTransform(
  (inboundState, key) => {
    inboundState = inboundState || {};

    // Keep only first 50 videos to avoid overflowing storage
    if (inboundState.videos && inboundState.videos.length > 50) {
      inboundState = {
        ...inboundState,
        videos: inboundState.videos.slice(0, 50)
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
    whitelist: ['youtube']
  }
);

export default YoutubeTransform;
