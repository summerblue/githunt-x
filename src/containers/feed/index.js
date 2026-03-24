import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import Filters from '../../components/filters';
import GroupHeading from '../../components/group-heading';
import { fetchTrending } from '../../redux/github/actions';
import { fetchYouTubeVideos } from '../../redux/youtube/actions';
import { fetchRedditPosts } from '../../redux/reddit/actions';
import RepositoryList from '../../components/repository-list';
import RepositoryGrid from '../../components/repository-grid';
import VideoList from '../../components/video-list';
import VideoGrid from '../../components/video-grid';
import PostList from '../../components/post-list';
import PostGrid from '../../components/post-grid';
import SearchTerm from '../../components/filters/search-term';
import DateJumpFilter from '../../components/filters/date-jump-filter';
import ViewFilter from '../../components/filters/view-filter';
import YoutubeSortFilter from '../../components/filters/youtube-sort-filter';
import RedditSortFilter from '../../components/filters/reddit-sort-filter';
import RedditTimeFilter from '../../components/filters/reddit-time-filter';
import SubredditInput from '../../components/filters/subreddit-input';
import { updateDateJump, updateLanguage, updateViewType, updateSearchTerm, updatePlatform, updateYoutubeSort, updateTheme, updateRedditSort, updateRedditSubreddit, updateRedditTimeFilter } from '../../redux/preference/actions';

class FeedContainer extends React.Component {
  componentDidMount() {
    if (this.props.preference.activePlatform === 'youtube') {
      this.initYouTube();
    } else if (this.props.preference.activePlatform === 'reddit') {
      this.initReddit();
    } else {
      this.initGitHub();
    }
  }

  initGitHub() {
    const existingRepositories = this.props.github.repositories || [];
    if (existingRepositories.length === 0) {
      localStorage.setItem("lastPage", 0);
      this.fetchNextRepositories();
    }
  }

  initYouTube() {
    const existingVideos = this.props.youtube.videos || [];
    if (existingVideos.length === 0) {
      this.fetchYouTubeVideos();
    }
  }

  initReddit() {
    const existingPosts = this.props.reddit.posts || [];
    if (existingPosts.length === 0) {
      this.fetchRedditPosts();
    }
  }

  fetchRedditPosts(after) {
    const filters = this.getRedditFilters(after);
    this.props.fetchRedditPosts(filters);
  }

  getRedditFilters(after) {
    const filters = {
      subreddit: this.props.preference.redditSubreddit || 'popular',
      sort: this.props.preference.redditSort || 'hot',
      timeFilter: this.props.preference.redditTimeFilter || 'week',
    };

    if (this.props.preference.searchTerm) {
      filters.searchTerm = this.props.preference.searchTerm;
    }

    if (after) {
      filters.after = after;
    }

    return filters;
  }

  fetchNextRepositories() {
    const filters = this.getFilters();
    this.props.fetchTrending(filters);
  }

  fetchYouTubeVideos(pageToken) {
    const filters = this.getYouTubeFilters(pageToken);
    this.props.fetchYouTubeVideos(filters);
  }

  componentDidUpdate(prevProps) {
    const currPreferences = this.props.preference;
    const prevPreferences = prevProps.preference;

    // Platform switch
    if (currPreferences.activePlatform !== prevPreferences.activePlatform) {
      if (currPreferences.activePlatform === 'youtube') {
        this.initYouTube();
      } else if (currPreferences.activePlatform === 'reddit') {
        this.initReddit();
      } else {
        this.initGitHub();
      }
      return;
    }

    if (currPreferences.activePlatform === 'github') {
      if (currPreferences.language !== prevPreferences.language ||
        currPreferences.dateJump !== prevPreferences.dateJump ||
        currPreferences.searchTerm !== prevPreferences.searchTerm
      ) {
        this.fetchNextRepositories();
      }
    } else if (currPreferences.activePlatform === 'youtube') {
      if (currPreferences.dateJump !== prevPreferences.dateJump ||
        currPreferences.searchTerm !== prevPreferences.searchTerm ||
        currPreferences.youtubeSort !== prevPreferences.youtubeSort
      ) {
        this.fetchYouTubeVideos();
      }
    } else if (currPreferences.activePlatform === 'reddit') {
      if (currPreferences.searchTerm !== prevPreferences.searchTerm ||
        currPreferences.redditSort !== prevPreferences.redditSort ||
        currPreferences.redditSubreddit !== prevPreferences.redditSubreddit ||
        currPreferences.redditTimeFilter !== prevPreferences.redditTimeFilter
      ) {
        this.fetchRedditPosts();
      }
    }
  }

  getFilters() {
    const filters = {};

    filters.dateRange = this.getNextDateRange();
    if (this.props.preference.language) {
      filters.language = this.props.preference.language;
    }

    if (this.props.preference.searchTerm) {
      filters.searchTerm = this.props.preference.searchTerm;
    }

    if (this.props.preference.options.token) {
      filters.token = this.props.preference.options.token;
    }

    return filters;
  }

  getYouTubeFilters(pageToken) {
    const filters = {
      youtubeApiKey: this.props.preference.options.youtubeApiKey,
      sortBy: this.props.preference.youtubeSort || 'viewCount',
      dateRange: this.getNextDateRange(),
    };

    if (this.props.preference.searchTerm) {
      filters.searchTerm = this.props.preference.searchTerm;
    }

    if (pageToken) {
      filters.pageToken = pageToken;
    }

    return filters;
  }

  getNextDateRange() {
    const repositories = this.props.github.repositories || [];
    const dateJump = this.props.preference.dateJump;

    const dateRange = {};
    const date_array = dateJump.split('-');
    var date_filter = ''
    var date_count = 1

    if (date_array.length > 1) {
      date_count = date_array[0]
      date_filter = date_array[1]
    } else {
      date_filter = date_array[0]
    }

    dateRange.start = moment().subtract(date_count, date_filter).startOf('day');
    dateRange.end = moment().startOf('day');

    return dateRange;
  }

  renderTokenWarning() {
    if (this.props.preference.activePlatform === 'reddit') {
      return null;
    }

    if (this.props.preference.activePlatform === 'youtube') {
      return !this.props.preference.options.youtubeApiKey && (
        <Alert type='warning'>
          Make sure to
          <strong className='ms-1 me-1'>
            <Link to='/options'>add a YouTube API key</Link>
          </strong>
          to use YouTube search
        </Alert>
      );
    }

    return !this.props.preference.options.token && (
      <Alert type='warning'>
        Make sure to
        <strong className='ms-1 me-1'>
          <Link to='/options'>add a token</Link>
        </strong>
        to avoid hitting the rate limit
      </Alert>
    );
  }

  renderErrors() {
    const platform = this.props.preference.activePlatform;
    let error;
    if (platform === 'youtube') {
      error = this.props.youtube.error;
    } else if (platform === 'reddit') {
      error = this.props.reddit.error;
    } else {
      error = this.props.github.error;
    }

    if (!error) {
      return null;
    }

    let message = '';
    if (platform === 'github') {
      switch (error.toLowerCase()) {
        case 'bad credentials':
          message = (
            <span>
              Token is invalid, try <Link to='/options'>updating the token</Link> on the options page
            </span>
          );
          break;
        case 'network error':
          message = 'Error trying to connect to GitHub servers';
          break;
        default:
          message = error;
          break;
      }
    } else {
      message = error;
    }

    return (
      <Alert type='danger'>
        { message }
      </Alert>
    );
  }

  renderAlerts() {
    const tokenWarning = this.renderTokenWarning();
    const error = this.renderErrors();

    if (tokenWarning || error) {
      return (
        <div className="alert-group">
          { tokenWarning }
          { error }
        </div>
      );
    }

    return null;
  }

  renderGitHubContent() {
    const hasRepos = this.props.github.repositories && this.props.github.repositories.length !== 0;

    return (
      <div className="container mb-5 pb-4">
        <div className="header-row clearfix">
          {
            hasRepos && <GroupHeading
              start={ this.props.github.repositories[0].start }
              end={ this.props.github.repositories[0].end }
              dateJump={ this.props.preference.dateJump }
            />
          }
          <div className="group-filters">
            {
              hasRepos && <Filters
                selectedLanguage={ this.props.preference.language }
                selectedViewType={ this.props.preference.viewType }
                inputSearchTerm={ this.props.preference.searchTerm }
                updateSearchTerm={ this.props.updateSearchTerm }
                updateLanguage={ this.props.updateLanguage }
                updateViewType={ this.props.updateViewType }
                updateDateJump={ this.props.updateDateJump }
                selectedDateJump={ this.props.preference.dateJump }
              />
            }
          </div>
        </div>
        <div className="body-row">
          { this.renderRepositoriesList() }
          { this.props.github.processing && <Loader/> }
          {
            !this.props.github.processing &&
            hasRepos &&
            (
              <button className="btn btn-primary shadow load-next-date"
                      onClick={ () => this.fetchNextRepositories() }>
                <i className="fa fa-refresh me-2"></i>
                Next Page
              </button>
            )
          }
        </div>
      </div>
    );
  }

  renderYouTubeContent() {
    const hasVideos = this.props.youtube.videos && this.props.youtube.videos.length > 0;

    return (
      <div className="container mb-5 pb-4">
        <div className="header-row clearfix">
          <div className="group-heading">
            <h4>
              <span className="small text-muted ms-2">
                YouTube Videos
                {hasVideos && ` (${this.props.youtube.totalResults.toLocaleString()} results)`}
              </span>
            </h4>
          </div>
          <div className="group-filters">
            <div className="filters-wrap mt-3 mt-sm-3 mt-md-0 mt-xl-0 mt-lg-0">
              <div className="filter-item">
                <SearchTerm
                  updateSearchTerm={ this.props.updateSearchTerm }
                  inputSearchTerm={ this.props.preference.searchTerm }
                />
              </div>
              <div className="filter-item">
                <YoutubeSortFilter
                  updateYoutubeSort={ this.props.updateYoutubeSort }
                  selectedSort={ this.props.preference.youtubeSort }
                />
              </div>
              <div className="filter-item">
                <DateJumpFilter
                  updateDateJump={ this.props.updateDateJump }
                  selectedDateJump={ this.props.preference.dateJump }
                />
              </div>
              <div className="filter-item d-none d-sm-none d-md-none d-xl-block d-lg-block">
                <ViewFilter
                  selectedViewType={ this.props.preference.viewType }
                  updateViewType={ this.props.updateViewType }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="body-row">
          { this.renderVideoList() }
          { this.props.youtube.processing && <Loader/> }
          {
            !this.props.youtube.processing &&
            hasVideos &&
            (
              <button className="btn btn-primary shadow load-next-date"
                      onClick={ () => this.fetchYouTubeVideos(this.props.youtube.nextPageToken) }
                      disabled={ !this.props.youtube.nextPageToken }>
                <i className="fa fa-refresh me-2"></i>
                Next Page
              </button>
            )
          }
        </div>
      </div>
    );
  }

  renderRepositoriesList() {
    if (this.props.preference.viewType === 'grid') {
      return <RepositoryGrid
        repositories={ this.props.github.repositories || [] }
        dateJump={ this.props.preference.dateJump }
      />;
    }

    return <RepositoryList
      repositories={ this.props.github.repositories || [] }
      dateJump={ this.props.preference.dateJump }
    />;
  }

  renderVideoList() {
    const videos = this.props.youtube.videos || [];

    if (this.props.preference.viewType === 'grid') {
      return <VideoGrid videos={videos} />;
    }

    return <VideoList videos={videos} />;
  }

  renderRedditContent() {
    const hasPosts = this.props.reddit.posts && this.props.reddit.posts.length > 0;
    const redditSort = this.props.preference.redditSort || 'hot';
    const showTimeFilter = redditSort === 'top' || redditSort === 'controversial';

    return (
      <div className="container mb-5 pb-4">
        <div className="header-row clearfix">
          <div className="group-heading">
            <h4>
              <span className="small text-muted ms-2">
                r/{this.props.preference.redditSubreddit || 'popular'}
                {hasPosts && ` — ${redditSort}`}
              </span>
            </h4>
          </div>
          <div className="group-filters">
            <div className="filters-wrap mt-3 mt-sm-3 mt-md-0 mt-xl-0 mt-lg-0">
              <div className="filter-item">
                <SubredditInput
                  updateRedditSubreddit={ this.props.updateRedditSubreddit }
                  subreddit={ this.props.preference.redditSubreddit }
                />
              </div>
              <div className="filter-item">
                <SearchTerm
                  updateSearchTerm={ this.props.updateSearchTerm }
                  inputSearchTerm={ this.props.preference.searchTerm }
                />
              </div>
              <div className="filter-item">
                <RedditSortFilter
                  updateRedditSort={ this.props.updateRedditSort }
                  selectedSort={ redditSort }
                />
              </div>
              {showTimeFilter && (
                <div className="filter-item">
                  <RedditTimeFilter
                    updateRedditTimeFilter={ this.props.updateRedditTimeFilter }
                    selectedTime={ this.props.preference.redditTimeFilter || 'week' }
                  />
                </div>
              )}
              <div className="filter-item d-none d-sm-none d-md-none d-xl-block d-lg-block">
                <ViewFilter
                  selectedViewType={ this.props.preference.viewType }
                  updateViewType={ this.props.updateViewType }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="body-row">
          { this.renderPostList() }
          { this.props.reddit.processing && <Loader/> }
          {
            !this.props.reddit.processing &&
            hasPosts &&
            (
              <button className="btn btn-primary shadow load-next-date"
                      onClick={ () => this.fetchRedditPosts(this.props.reddit.after) }
                      disabled={ !this.props.reddit.after }>
                <i className="fa fa-refresh me-2"></i>
                Next Page
              </button>
            )
          }
        </div>
      </div>
    );
  }

  renderPostList() {
    const posts = this.props.reddit.posts || [];

    if (this.props.preference.viewType === 'grid') {
      return <PostGrid posts={posts} />;
    }

    return <PostList posts={posts} />;
  }

  render() {
    const platform = this.props.preference.activePlatform;

    return (
      <div className="page-wrap">
        <Sidebar
          activePlatform={ platform || 'github' }
          updatePlatform={ this.props.updatePlatform }
        />
        <TopNav
          activePlatform={ platform || 'github' }
          theme={ this.props.preference.theme || 'dark' }
          updateTheme={ this.props.updateTheme }
        />

        { this.renderAlerts() }

        { platform === 'reddit'
          ? this.renderRedditContent()
          : platform === 'youtube'
            ? this.renderYouTubeContent()
            : this.renderGitHubContent()
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    preference: store.preference,
    github: store.github,
    youtube: store.youtube,
    reddit: store.reddit,
  };
};

const mapDispatchToProps = {
  updateLanguage,
  updateViewType,
  updateSearchTerm,
  updateDateJump,
  updatePlatform,
  updateYoutubeSort,
  updateRedditSort,
  updateRedditSubreddit,
  updateRedditTimeFilter,
  updateTheme,
  fetchTrending,
  fetchYouTubeVideos,
  fetchRedditPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
