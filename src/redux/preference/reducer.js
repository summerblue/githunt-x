import { UPDATE_DATE_TYPE, UPDATE_LANGUAGE, UPDATE_OPTIONS, UPDATE_VIEW_TYPE, UPDATE_SEARCH_TERM, UPDATE_PLATFORM, UPDATE_YOUTUBE_SORT, UPDATE_THEME, UPDATE_REDDIT_SORT, UPDATE_REDDIT_SUBREDDIT, UPDATE_REDDIT_TIME_FILTER } from './types';

const initialState = {
  viewType: 'list',
  dateJump: 'week',
  language: '',
  activePlatform: 'github',
  youtubeSort: 'viewCount',
  redditSort: 'hot',
  redditSubreddit: 'popular',
  redditTimeFilter: 'week',
  theme: 'dark',
  options: {
    token: '',
    youtubeApiKey: '',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    case UPDATE_DATE_TYPE:
      return {
        ...state,
        dateJump: action.payload
      };
    case UPDATE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload
      };
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case UPDATE_PLATFORM:
      return {
        ...state,
        activePlatform: action.payload
      };
    case UPDATE_YOUTUBE_SORT:
      return {
        ...state,
        youtubeSort: action.payload
      };
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case UPDATE_REDDIT_SORT:
      return {
        ...state,
        redditSort: action.payload
      };
    case UPDATE_REDDIT_SUBREDDIT:
      return {
        ...state,
        redditSubreddit: action.payload
      };
    case UPDATE_REDDIT_TIME_FILTER:
      return {
        ...state,
        redditTimeFilter: action.payload
      };
    default:
      return state;
  }
}
