# GitHunt X

A Chrome extension that replaces the new tab with trending GitHub repositories and YouTube videos.

Forked from [kamranahmedse/githunt](https://github.com/kamranahmedse/githunt), with significant enhancements.

## Features

- **Multi-platform** - Browse trending GitHub repos and YouTube videos in one place
- **Sidebar navigation** - Quick switch between GitHunt and YouTube
- **Dark / Light theme** - Toggle with the sun/moon button in the top nav
- **Keyword search** - Filter repos or videos by search term
- **Date range filter** - Daily, weekly, monthly, yearly, and more
- **YouTube sort** - Sort by view count, newest, relevance, or top rated
- **Visited link tracking** - Green checkmark and dimmed title for links you've already clicked
- **Grid / List view** - Switch between two layout modes
- **Pagination** - "Next Page" button to load more results
- **Language filter** - Filter GitHub repos by programming language
- **100 results per page** - More results at a glance
- **Last commit time** - See when a repo was last updated

## Installation

### Chrome Web Store

Install from the [Chrome Web Store](https://goo.gl/e7YP1h).

### Manual Install

1. Clone the project and install dependencies:

```bash
npm install
```

2. Build the Chrome extension:

```bash
npm run build-chrome
```

This generates a `build/` folder.

3. Open Chrome, go to `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the `build/` folder.

## Development

```bash
npm start
```

Opens a dev server at `http://localhost:3000` with hot reload.

## Configuration

Click the settings icon or navigate to the options page to configure:

- **GitHub Token** - Add a personal access token to avoid API rate limits
- **YouTube API Key** - Add a YouTube Data API v3 key to enable YouTube search

## Screenshots

<p align="center">
    <img src="https://github.com/summerblue/githunt-x/blob/master/public/img/dark-mod.png?raw=true" />
    <img src="https://github.com/summerblue/githunt-x/blob/master/public/img/time-filter.png?raw=true" />
</p>

## Tech Stack

- React 18, Redux, Redux Persist
- Bootstrap 5.3 (with native dark mode)
- YouTube Data API v3, GitHub Search API
- Chrome Extension Manifest V3

## License

MIT © [Summer](https://github.com/summerblue)
MIT © [Kamran Ahmed](https://kamranahmed.info)
