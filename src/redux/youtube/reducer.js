import { FETCH_YOUTUBE_FAILED, FETCH_YOUTUBE_SUCCESS, PROCESS_FETCH_YOUTUBE } from './types';
import { UPDATE_DATE_TYPE, UPDATE_SEARCH_TERM, UPDATE_YOUTUBE_SORT } from '../preference/types';

export const initialState = {
  processing: false,
  videos: [],
  nextPageToken: null,
  totalResults: 0,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PROCESS_FETCH_YOUTUBE:
      return {
        ...state,
        processing: true,
        error: null
      };
    case UPDATE_DATE_TYPE:
    case UPDATE_SEARCH_TERM:
    case UPDATE_YOUTUBE_SORT:
      return {
        ...state,
        ...initialState
      };
    case FETCH_YOUTUBE_SUCCESS:
      return {
        ...state,
        videos: [
          ...state.videos,
          ...action.payload.videos
        ],
        nextPageToken: action.payload.nextPageToken,
        totalResults: action.payload.totalResults,
        processing: false,
        error: null
      };
    case FETCH_YOUTUBE_FAILED:
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    default:
      return state;
  }
}
