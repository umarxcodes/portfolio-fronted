# Portfolio Frontend

Production-grade portfolio frontend for **Muhammad Umar**, Full-Stack Software Engineer. Built with React, Tailwind CSS, and Motion. Designed for performance, accessibility, and maintainability.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)
![Motion](https://img.shields.io/badge/Motion-12.42-FF007F?logo=framer)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.101-FF4154?logo=reactquery)

---

## Features

### Public Site
- Responsive hero with animated profile portrait, social links, and resume download
- Featured projects grid with thumbnail previews
- Skills matrix with progress indicators
- Experience timeline
- Education and certifications
- Latest blog posts
- Contact form with validation
- Dark / light / system theme switching
- Global search
- SEO meta tags, Open Graph, Twitter Cards, sitemap, robots.txt

### Admin Dashboard
- Protected admin routes with authentication guards
- Dashboard analytics with charts and KPIs
- Profile management with image and resume upload
- Projects CRUD with category and status management
- Skills matrix management
- Experience timeline management
- Education and certificates management
- Blog management with rich metadata
- Contact inbox with status workflow
- Upload center with Cloudinary integration
- Site settings management
- Account management with password change

### Engineering
- Feature-first architecture with clear separation of concerns
- Centralized motion system with Framer Motion
- GPU-accelerated animations respecting `prefers-reduced-motion`
- Code splitting and lazy-loaded routes
- TanStack Query for server state with optimistic updates
- Zod validation for forms and uploads
- Normalized API error handling
- ESLint with strict rules and zero-warning policy
- Prettier + Husky + lint-staged + commitlint
- Cloudinary-backed upload pipeline with progress tracking
- Accessible UI primitives with ARIA labels and focus management

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Routing | React Router DOM 7 |
| Data Fetching | TanStack Query v5 |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Uploads | Cloudinary |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged + commitlint |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend API running (see `portfolio-backend`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app is available at `http://localhost:5173`.

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_APP_TITLE` | Site title |
| `VITE_APP_VERSION` | App version |
| `VITE_DEV_PROXY_TARGET` | Optional dev proxy target for API (defaults to deployed backend) |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint with zero-warning policy |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run prepare` | Install git hooks |

---

## Project Structure

```
src/
├── api/                        # HTTP client, endpoints, query client
│   ├── axios.js                # Axios instance with interceptors
│   ├── client.js               # Low-level HTTP helpers
│   ├── endpoints.js            # Centralized API route map
│   └── queryClient.js          # TanStack Query configuration
├── app/                        # App shell and providers
│   ├── AppProviders.jsx        # Context and router wrapper
│   ├── AppMetadata.jsx         # Dynamic SEO meta tags
│   ├── Router.jsx              # Lazy-loaded route definitions
│   ├── RouteFallback.jsx       # Route-level suspense fallback
│   └── ScrollToTop.jsx         # Scroll restoration on navigation
├── components/
│   ├── common/                 # Shared layout components
│   │   ├── AnimatedNumber.jsx
│   │   ├── BrandIcons.jsx
│   │   ├── SectionHeading.jsx
│   │   └── ThemeToggle.jsx
│   ├── forms/                  # Form-specific components
│   │   ├── FileUploadField.jsx
│   │   └── TagInput.jsx
│   └── ui/                     # Design system primitives
│       ├── Avatar.jsx
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Checkbox.jsx
│       ├── ConfirmDialog.jsx
│       ├── DataTable.jsx
│       ├── Dialog.jsx
│       ├── Drawer.jsx
│       ├── EmptyState.jsx
│       ├── ErrorState.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Pagination.jsx
│       ├── Radio.jsx
│       ├── Select.jsx
│       ├── Skeleton.jsx
│       ├── Spinner.jsx
│       ├── Switch.jsx
│       ├── Tabs.jsx
│       ├── ToastViewport.jsx
│       ├── Tooltip.jsx
│       └── index.js
├── config/
│   ├── env.js                  # Runtime environment configuration
│   └── identity.js             # Brand identity and fallback values
├── constants/
│   ├── enums.js                # Shared enums and status metadata
│   ├── pagination.js           # Admin page size constants
│   ├── queryKeys.js            # TanStack Query key factory
│   └── routes.js               # Route map for navigation
├── context/
│   ├── AuthContext.jsx          # JWT session management
│   ├── SidebarContext.jsx       # Admin drawer state
│   ├── ThemeContext.jsx         # Dark / light / system theme
│   ├── ToastContext.jsx         # Toast notification system
│   └── index.js
├── features/                   # Feature-first architecture
│   ├── analytics/              # Dashboard and metrics
│   ├── auth/                   # Login and account management
│   ├── blogs/                  # Blog public pages and admin
│   ├── certificates/           # Certificates management
│   ├── contact/                # Contact form and inbox
│   ├── education/              # Education records
│   ├── experience/             # Work experience timeline
│   ├── home/                   # Public homepage
│   ├── misc/                   # 404 page
│   ├── profile/                # Public profile CRUD
│   ├── projects/               # Projects public pages and admin
│   ├── search/                 # Global search
│   ├── settings/               # Site configuration
│   ├── skills/                 # Skills matrix and admin
│   └── uploads/                # Asset management
├── hooks/
│   ├── index.js                # Custom hooks: useDebounce, useLocalStorage, etc.
│   └── useOverlay.js           # Shared modal and drawer behavior
├── layouts/
│   ├── DashboardLayout/        # Admin sidebar layout
│   └── PublicLayout/           # Public site layout
├── lib/
│   ├── cn.js                   # Class name utility
│   ├── errorHandler.js         # API error normalization
│   ├── format.js               # Date, number, and string formatters
│   ├── queryString.js          # Query string serialization
│   ├── token.js                # Token storage abstraction
│   ├── upload.js               # Upload helper utilities
│   └── validators.js           # Zod schemas and upload constraints
├── motion/                     # Centralized motion system
│   ├── AnimatedSection.jsx     # Scroll-triggered reveal
│   ├── FadeImage.jsx           # Image fade-in with placeholder
│   ├── PageTransition.jsx      # Route transition wrapper
│   ├── constants.js            # Easing curves and durations
│   ├── hooks.js                # useReducedMotion
│   ├── index.js
│   └── variants.js             # Reusable Motion variants
├── routes/
│   └── Guards.jsx              # PrivateRoute and GuestRoute
├── index.css                   # Tailwind directives and design tokens
└── main.jsx                    # Application entry point
```

---

## Architecture

### Feature-First Organization

Each feature in `src/features/` is self-contained:

```
features/<feature>/
├── api.js          # API calls
├── hooks.js        # React Query hooks
├── validation.js   # Zod schemas
├── index.js        # Barrel export
└── pages/          # Route-level components
```

### Design System

All UI primitives live in `src/components/ui/` and follow a consistent contract:

- **Variants** — `primary`, `secondary`, `ghost`, `danger`, `outline`, `link`
- **Sizes** — `xs`, `sm`, `md`, `lg`, `icon`
- **States** — default, hover, focus, disabled, loading, error, success
- **Dark mode** — All components use semantic CSS variables

### Motion System

The `src/motion/` layer provides:

- Shared easing curves and durations
- Reusable Framer Motion variants
- `PageTransition` for route changes
- `AnimatedSection` for scroll reveals
- `FadeImage` for image loading states
- Automatic `prefers-reduced-motion` respect

---

## Performance

- Route-based code splitting with `React.lazy` and `Suspense`
- Manual vendor chunks: React, data layer, charts
- Image CLS prevention with explicit `width` and `height`
- Lazy loading for non-critical images
- Memoized pure UI components
- TanStack Query caching with `staleTime` and `gcTime`
- GPU-accelerated animations only (`transform`, `opacity`)

---

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Focus management in modals and drawers
- Keyboard navigation support
- `prefers-reduced-motion` respected globally
- Color contrast compliance

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Deployment

### Vercel

1. Connect the repository
2. Set environment variables in project settings
3. Deploy on push to `development` branch

### Other Platforms

```bash
npm run build
```

The `dist/` folder contains the production build.

---

## Contributing

This is a personal portfolio project. If you want to use it as a template:

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Ensure `npm run lint` passes with zero warnings
5. Submit a pull request

---

## License

MIT
