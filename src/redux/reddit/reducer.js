import { FETCH_REDDIT_FAILED, FETCH_REDDIT_SUCCESS, PROCESS_FETCH_REDDIT } from './types';
import { UPDATE_SEARCH_TERM } from '../preference/types';
import { UPDATE_REDDIT_SORT, UPDATE_REDDIT_SUBREDDIT, UPDATE_REDDIT_TIME_FILTER } from '../preference/types';

export const initialState = {
  processing: false,
  posts: [],
  after: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PROCESS_FETCH_REDDIT:
      return {
        ...state,
        processing: true,
        error: null
      };
    case UPDATE_SEARCH_TERM:
    case UPDATE_REDDIT_SORT:
    case UPDATE_REDDIT_SUBREDDIT:
    case UPDATE_REDDIT_TIME_FILTER:
      return {
        ...state,
        ...initialState
      };
    case FETCH_REDDIT_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.payload.posts
        ],
        after: action.payload.after,
        processing: false,
        error: null
      };
    case FETCH_REDDIT_FAILED:
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    default:
      return state;
  }
}
