import { UPDATE_DATE_TYPE, UPDATE_LANGUAGE, UPDATE_OPTIONS, UPDATE_VIEW_TYPE, UPDATE_SEARCH_TERM, UPDATE_PLATFORM, UPDATE_YOUTUBE_SORT, UPDATE_THEME, UPDATE_REDDIT_SORT, UPDATE_REDDIT_SUBREDDIT, UPDATE_REDDIT_TIME_FILTER } from './types';

export const updateOptions = function (options) {
  return dispatch => {
    dispatch({
      type: UPDATE_OPTIONS,
      payload: options,
    });
  };
};

export const updateViewType = function (viewType = 'grid') {
  return dispatch => {
    dispatch({
      type: UPDATE_VIEW_TYPE,
      payload: viewType
    });
  };
};

export const updateLanguage = function (language) {
  return dispatch => {
    dispatch({
      type: UPDATE_LANGUAGE,
      payload: language
    });
  };
};

export const updateDateJump = function (dateJump) {
  return dispatch => {
    dispatch({
      type: UPDATE_DATE_TYPE,
      payload: dateJump
    });
  };
};

export const updateSearchTerm = function (searchTerm) {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_TERM,
      payload: searchTerm
    });
  };
};

export const updatePlatform = function (platform) {
  return dispatch => {
    dispatch({
      type: UPDATE_PLATFORM,
      payload: platform
    });
  };
};

export const updateYoutubeSort = function (sortBy) {
  return dispatch => {
    dispatch({
      type: UPDATE_YOUTUBE_SORT,
      payload: sortBy
    });
  };
};

export const updateTheme = function (theme) {
  return dispatch => {
    dispatch({
      type: UPDATE_THEME,
      payload: theme
    });
  };
};

export const updateRedditSort = function (sort) {
  return dispatch => {
    dispatch({
      type: UPDATE_REDDIT_SORT,
      payload: sort
    });
  };
};

export const updateRedditSubreddit = function (subreddit) {
  return dispatch => {
    dispatch({
      type: UPDATE_REDDIT_SUBREDDIT,
      payload: subreddit
    });
  };
};

export const updateRedditTimeFilter = function (timeFilter) {
  return dispatch => {
    dispatch({
      type: UPDATE_REDDIT_TIME_FILTER,
      payload: timeFilter
    });
  };
};
