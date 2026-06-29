# Movie-DB

A React + TypeScript movie browser built with The Movie Database API.

The app allows users to browse popular movies, filter movies by genre, search by title, open movie detail pages, view ratings, posters, descriptions, release information, budget, revenue, runtime, and production countries.

## Features

* Popular movies list
* Movie search
* Genre-based movie browsing
* Movie detail page
* Pagination
* Light/dark theme toggle
* TMDB poster images
* Typed Redux store
* API layer separated from UI components
* Environment-based API configuration

## Tech Stack

* React 18
* TypeScript
* Redux Toolkit
* React Redux
* React Router
* Axios
* Material UI
* React Hook Form
* Create React App

## Project Structure

```txt
src/
  api/              Axios client and TMDB endpoints
  components/       Reusable UI components
  config/           Environment-based app config
  constants/        Routes, UI text, request statuses
  contexts/         Theme context
  hooks/            Typed Redux hooks and custom hooks
  pages/            Route-level pages
  services/         API service functions
  store/            Redux store and slices
  styles/           Global theme styles
  types/            TMDB response types
  utils/            Shared utility functions
```

## Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_TMDB_API_BASE_URL=https://api.themoviedb.org
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
REACT_APP_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
```

The app uses a TMDB Read Access Token for API requests.

Do not commit your real `.env` file. Use `.env.example` as a safe template.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production into the `build` folder.

### `npm test`

Runs the test runner.

### `npm run lint`

Runs ESLint checks.

## Notes

This is a portfolio/demo project. Movie data and images are provided by The Movie Database API.
