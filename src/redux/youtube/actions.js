import axios from 'axios';
import moment from 'moment';

import {
  FETCH_YOUTUBE_FAILED,
  FETCH_YOUTUBE_SUCCESS,
  PROCESS_FETCH_YOUTUBE,
} from './types';

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';

const transformFilters = (filters) => {
  const params = {
    part: 'snippet',
    type: 'video',
    maxResults: 50,
    order: filters.sortBy || 'viewCount',
    key: filters.youtubeApiKey,
  };

  if (filters.searchTerm) {
    params.q = filters.searchTerm;
  }

  if (filters.dateRange) {
    const startMoment = moment(filters.dateRange.start);
    const endMoment = moment(filters.dateRange.end);
    params.publishedAfter = startMoment.toISOString();
    params.publishedBefore = endMoment.toISOString();
  }

  if (filters.pageToken) {
    params.pageToken = filters.pageToken;
  }

  return params;
};

export const fetchYouTubeVideos = function (filters) {
  return dispatch => {
    dispatch({ type: PROCESS_FETCH_YOUTUBE });

    const params = transformFilters(filters);

    axios.get(SEARCH_URL, { params })
      .then(response => {
        const videoIds = response.data.items
          .filter(item => item.id && item.id.videoId)
          .map(item => item.id.videoId)
          .join(',');

        if (!videoIds) {
          dispatch({
            type: FETCH_YOUTUBE_SUCCESS,
            payload: {
              videos: [],
              nextPageToken: response.data.nextPageToken || null,
              totalResults: response.data.pageInfo ? response.data.pageInfo.totalResults : 0,
            }
          });
          return;
        }

        // Fetch video statistics (view counts, likes, etc.)
        return axios.get(VIDEOS_URL, {
          params: {
            part: 'statistics,contentDetails,snippet',
            id: videoIds,
            key: filters.youtubeApiKey,
          }
        }).then(statsResponse => {
          const videos = statsResponse.data.items.map(video => ({
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            channelTitle: video.snippet.channelTitle,
            channelId: video.snippet.channelId,
            publishedAt: video.snippet.publishedAt,
            thumbnail: video.snippet.thumbnails.high || video.snippet.thumbnails.medium || video.snippet.thumbnails.default,
            viewCount: parseInt(video.statistics.viewCount || 0),
            likeCount: parseInt(video.statistics.likeCount || 0),
            commentCount: parseInt(video.statistics.commentCount || 0),
            duration: video.contentDetails.duration,
          }));

          dispatch({
            type: FETCH_YOUTUBE_SUCCESS,
            payload: {
              videos,
              nextPageToken: response.data.nextPageToken || null,
              totalResults: response.data.pageInfo ? response.data.pageInfo.totalResults : 0,
            }
          });
        });
      })
      .catch(error => {
        let message = error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message;

        if (!message) {
          message = error.message;
        }

        dispatch({
          type: FETCH_YOUTUBE_FAILED,
          payload: message
        });
      });
  };
};
