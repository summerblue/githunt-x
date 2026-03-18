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
import RepositoryList from '../../components/repository-list';
import RepositoryGrid from '../../components/repository-grid';
import VideoList from '../../components/video-list';
import VideoGrid from '../../components/video-grid';
import SearchTerm from '../../components/filters/search-term';
import DateJumpFilter from '../../components/filters/date-jump-filter';
import ViewFilter from '../../components/filters/view-filter';
import YoutubeSortFilter from '../../components/filters/youtube-sort-filter';
import { updateDateJump, updateLanguage, updateViewType, updateSearchTerm, updatePlatform, updateYoutubeSort, updateTheme } from '../../redux/preference/actions';

class FeedContainer extends React.Component {
  componentDidMount() {
    if (this.props.preference.activePlatform === 'youtube') {
      this.initYouTube();
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
    const isYouTube = this.props.preference.activePlatform === 'youtube';
    const error = isYouTube ? this.props.youtube.error : this.props.github.error;

    if (!error) {
      return null;
    }

    let message = '';
    if (!isYouTube) {
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
            this.props.youtube.nextPageToken &&
            (
              <button className="btn btn-primary shadow load-next-date"
                      onClick={ () => this.fetchYouTubeVideos(this.props.youtube.nextPageToken) }>
                <i className="fa fa-refresh me-2"></i>
                Load More
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

  render() {
    const isYouTube = this.props.preference.activePlatform === 'youtube';

    return (
      <div className="page-wrap">
        <Sidebar
          activePlatform={ this.props.preference.activePlatform || 'github' }
          updatePlatform={ this.props.updatePlatform }
        />
        <TopNav
          activePlatform={ this.props.preference.activePlatform || 'github' }
          theme={ this.props.preference.theme || 'dark' }
          updateTheme={ this.props.updateTheme }
        />

        { this.renderAlerts() }

        { isYouTube ? this.renderYouTubeContent() : this.renderGitHubContent() }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    preference: store.preference,
    github: store.github,
    youtube: store.youtube,
  };
};

const mapDispatchToProps = {
  updateLanguage,
  updateViewType,
  updateSearchTerm,
  updateDateJump,
  updatePlatform,
  updateYoutubeSort,
  updateTheme,
  fetchTrending,
  fetchYouTubeVideos,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
