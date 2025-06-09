# Country Explorer - Documentation

## Overview
React 18 + TypeScript app for exploring countries with:
- Browse with pagination
- Search & filter
- Country details panel
- Favourites & notes
- Error handling

## Testing Approach
- 6 comprehensive hook tests for `useCountries` covering:
  - Data fetching
  - Search/filter functionality
  - Error handling
  - Favorites & notes
- Manual verification for UI interactions
- Skipped React.lazy due to testing framework constraints

## Tech Stack
- React 18
- TypeScript
- Custom hooks (useCountries)
- Jest + React Testing Library
- ESLint + Prettier

## Get Started

1. Install pnpm:
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm i
```

3. Run dev server (API + web):
```bash
pnpm dev
```

4. Check for linting errors:
```bash
pnpm lint
```

## Project Structure
- **apps/**
  - `web`: Next.js frontend
  - `api`: Node.js backend (delivers countries data)
- **packages/**
  - `components`: Shared UI components
  - `config-ts`: TypeScript base config
  - `config-eslint`: ESLint base config
  - `types`: Shared domain types

