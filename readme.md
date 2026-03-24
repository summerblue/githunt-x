# GitHunt X

A Chrome extension that replaces the new tab with trending GitHub repositories, YouTube videos, and Reddit posts.

Forked from [kamranahmedse/githunt](https://github.com/kamranahmedse/githunt), with significant enhancements.

## Features

- **Multi-platform** - Browse trending GitHub repos, YouTube videos, and Reddit posts in one place
- **Sidebar navigation** - Quick switch between GitHunt, YouTube, and Reddit
- **Dark / Light theme** - Toggle with the sun/moon button in the top nav
- **Keyword search** - Filter repos or videos by search term
- **Date range filter** - Daily, weekly, monthly, yearly, and more
- **YouTube sort** - Sort by view count, newest, relevance, or top rated
- **Reddit browsing** - Browse any subreddit with Hot/New/Top/Rising/Controversial sort
- **Reddit time filter** - Filter Top/Controversial posts by hour, day, week, month, year, or all time
- **Frequent subreddits** - Subreddits searched 2+ times appear as quick-access tags
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

### Reddit API Proxy

Reddit's JSON API (`reddit.com/r/{subreddit}/{sort}.json`) blocks cross-origin requests from browsers with a 403 Forbidden response. This project handles it differently depending on the runtime environment:

- **Development mode** (`npm start`) — CRA's dev server proxies `/reddit-api/*` requests to `https://www.reddit.com` via `src/setupProxy.js`, adding a proper `User-Agent` header. The browser only sees a same-origin request, so no CORS issues.
- **Chrome extension** (`npm run build-chrome`) — The extension's `manifest.json` declares `*://*.reddit.com/*` in `host_permissions`, which lets the browser bypass CORS restrictions entirely for extension-initiated requests.
- **Production web** — Requires a reverse proxy (Nginx, Cloudflare Worker, etc.) to forward `/reddit-api/*` to Reddit, since there's no dev server or extension privileges.

GitHub and YouTube APIs support CORS natively, so they don't need this treatment.

## Configuration

Click the settings icon or navigate to the options page to configure:

- **GitHub Token** - Add a personal access token to avoid API rate limits
- **YouTube API Key** - Add a YouTube Data API v3 key to enable YouTube search
- **Reddit** - No API key needed. Uses Reddit's public JSON endpoints

## Screenshots

### GitHunt - Trending GitHub Repositories
![GitHunt](https://github.com/summerblue/githunt-x/blob/master/public/img/20260319-172612.jpg?raw=true)

### YouTube - Trending Videos
![YouTube](https://github.com/summerblue/githunt-x/blob/master/public/img/20260319-172607.jpg?raw=true)

## Tech Stack

- React 18, Redux, Redux Persist
- Bootstrap 5.3 (with native dark mode)
- YouTube Data API v3, GitHub Search API, Reddit JSON API
- Chrome Extension Manifest V3

## License

MIT © [Summer](https://github.com/summerblue)
MIT © [Kamran Ahmed](https://kamranahmed.info)
