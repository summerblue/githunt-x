import axios from 'axios';

import {
  FETCH_REDDIT_FAILED,
  FETCH_REDDIT_SUCCESS,
  PROCESS_FETCH_REDDIT,
} from './types';

function getBaseUrl() {
  // Chrome extension mode: use direct URL (host_permissions handles CORS)
  if (window.chrome && window.chrome.runtime && window.chrome.runtime.id) {
    return 'https://www.reddit.com';
  }
  // Dev server mode: proxy through setupProxy.js
  if (process.env.NODE_ENV === 'development') {
    return '/reddit-api';
  }
  // Production web mode: also use proxy path (needs reverse proxy in production)
  return '/reddit-api';
}

export const fetchRedditPosts = function (filters) {
  return dispatch => {
    dispatch({ type: PROCESS_FETCH_REDDIT });

    const subreddit = filters.subreddit || 'popular';
    const sort = filters.sort || 'hot';

    const baseUrl = getBaseUrl();
    let url;
    let params = { raw_json: 1 };

    if (filters.searchTerm) {
      url = `${baseUrl}/r/${subreddit}/search.json`;
      params.q = filters.searchTerm;
      params.restrict_sr = 'on';
      params.sort = sort;
      if (sort === 'top' || sort === 'controversial') {
        params.t = filters.timeFilter || 'week';
      }
    } else {
      url = `${baseUrl}/r/${subreddit}/${sort}.json`;
      if (sort === 'top' || sort === 'controversial') {
        params.t = filters.timeFilter || 'week';
      }
    }

    params.limit = 25;

    if (filters.after) {
      params.after = filters.after;
    }

    axios.get(url, { params })
      .then(response => {
        const listing = response.data.data;
        const posts = listing.children
          .filter(child => child.kind === 't3')
          .map(child => {
            const d = child.data;
            return {
              id: d.id,
              title: d.title,
              author: d.author,
              subreddit: d.subreddit,
              score: d.score,
              upvoteRatio: d.upvote_ratio,
              numComments: d.num_comments,
              createdUtc: d.created_utc,
              permalink: d.permalink,
              url: d.url,
              domain: d.domain,
              selftext: d.selftext || '',
              thumbnail: d.thumbnail && d.thumbnail.startsWith('http') ? d.thumbnail : null,
              preview: d.preview && d.preview.images && d.preview.images[0]
                ? d.preview.images[0].source.url.replace(/&amp;/g, '&')
                : null,
              isVideo: d.is_video,
              isSelf: d.is_self,
              linkFlairText: d.link_flair_text,
              stickied: d.stickied,
              over18: d.over_18,
            };
          });

        dispatch({
          type: FETCH_REDDIT_SUCCESS,
          payload: {
            posts,
            after: listing.after,
          }
        });
      })
      .catch(error => {
        let message = error.response && error.response.data && error.response.data.message;
        if (!message) {
          message = error.message;
        }
        dispatch({
          type: FETCH_REDDIT_FAILED,
          payload: message
        });
      });
  };
};
