# Portfolio Frontend

A production-ready React starter template with modern tooling.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- ESLint 9 (flat config)
- Prettier
- Husky + lint-staged + commitlint

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Install git hooks
npm run prepare
```

## Structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Root component
├── index.css         # Global styles + Tailwind
├── constants/        # App constants
│   └── app.js
└── utils/            # Utility functions
    └── cn.js
```

## Environment Variables

Copy `.env.example` to `.env` and adjust values.

```
VITE_APP_TITLE="Portfolio Frontend"
VITE_APP_VERSION="1.0.0"
```

## Deployment

Deploy to Vercel with the included `vercel.json` configuration.

## Code Standards

- ESLint + Prettier for code quality
- Conventional Commits via commitlint
- Staged checks via lint-staged
