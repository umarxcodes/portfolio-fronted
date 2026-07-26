# Portfolio Frontend

Production-grade portfolio frontend for **Muhammad Umar**, Full-Stack Software Engineer. Built with React, Tailwind CSS, and Framer Motion. Designed for performance, accessibility, and maintainability.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Motion](https://img.shields.io/badge/Motion-12.42-FF007F?logo=framer)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.101-FF4154?logo=reactquery)

---

## Features

### Public Site
- **Hero section** with animated profile portrait, parallax background, social links, WhatsApp chat, and resume download
- **Animated stats strip** with scroll-triggered counters (years, projects, skills, certifications)
- **Featured projects** grid with hover effects and staggered reveal animations
- **Skills matrix** with animated SVG radial progress rings, category-specific colors, and glow effects
- **Experience timeline** with alternating cards and scroll-triggered reveals
- **Education timeline** with glassmorphism cards, pulsing timeline dots, and alternating layout
- **Certificates** with premium holographic shimmer cards, verified stamps, and credential verification links
- **Latest blog posts** grid with cover images and reading time
- **Contact form** with validation and WhatsApp deep link
- **Global search** across projects, blogs, skills, experience, education, and certificates
- **Dark / light / system theme** switching with persistent preference
- **SEO meta tags**, Open Graph, Twitter Cards, manifest, favicon set

### Admin Dashboard
- Protected admin routes with authentication guards
- Dashboard analytics with charts and KPIs
- Profile management with image and resume upload
- Projects CRUD with category and status management
- Skills matrix management with category and proficiency levels
- Experience timeline management
- Education records management
- Certificates management with badge images and credential verification
- Blog management with rich metadata
- Contact inbox with read/replied status workflow
- Upload center with Vercel Blob integration
- Site settings management (branding, SEO, social links, theme)
- Account management with password change

### Engineering
- Feature-first architecture with clear separation of concerns
- Centralized motion system with Framer Motion and custom scroll reveal components
- Route-level code splitting with `React.lazy` and `Suspense` (initial bundle ~132 KB gzipped)
- GPU-accelerated animations only (`transform`, `opacity`) with `prefers-reduced-motion` support
- TanStack Query for server state with optimistic updates
- Zod validation for forms and uploads
- Normalized API error handling
- ESLint with strict rules and zero-warning policy
- Prettier + Husky + lint-staged + commitlint
- Accessible UI primitives with ARIA labels and focus management
- GitHub Actions CI with lint + build on every push/PR
- Vercel preview and production deployment automation

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
| Uploads | Vercel Blob / Cloudinary |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged + commitlint |
| CI/CD | GitHub Actions + Vercel |

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Yarn >= 1.22
- Backend API running (see `portfolio-backend`)

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
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
| `yarn dev` | Start development server |
| `yarn build` | Production build |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint with zero-warning policy |
| `yarn lint:fix` | Auto-fix lint issues |
| `yarn format` | Format code with Prettier |
| `yarn format:check` | Check formatting |
| `yarn prepare` | Install git hooks |

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
│   ├── AppMetadata.jsx         # Dynamic SEO meta tags
│   ├── AppProviders.jsx        # Context and router wrapper
│   ├── RouteFallback.jsx       # Route-level suspense fallback
│   ├── Router.jsx              # Lazy-loaded route definitions
│   └── ScrollToTop.jsx         # Scroll restoration on navigation
├── components/
│   ├── common/                 # Shared layout components
│   │   ├── AnimatedNumber.jsx  # Scroll-triggered animated counters
│   │   ├── BrandIcons.jsx      # Social brand icon components
│   │   ├── Reveal.jsx          # Scroll-triggered reveal wrapper
│   │   ├── SectionHeading.jsx  # Reusable section header
│   │   └── ThemeToggle.jsx     # Dark/light/system theme switcher
│   ├── forms/                  # Form-specific components
│   │   ├── FileUploadField.jsx # Upload with progress tracking
│   │   └── TagInput.jsx        # Tag/chip input with keyboard support
│   └── ui/                     # Design system primitives
│       ├── Avatar.jsx
│       ├── Badge.jsx
│       ├── Button.jsx          # Variants: primary, secondary, ghost, danger, outline, link
│       ├── Card.jsx
│       ├── Checkbox.jsx
│       ├── ConfirmDialog.jsx
│       ├── DataTable.jsx       # Sortable table with pagination
│       ├── Drawer.jsx
│       ├── EmptyState.jsx
│       ├── ErrorState.jsx
│       ├── Input.jsx           # With startAdornment/endAdornment support
│       ├── Modal.jsx
│       ├── Pagination.jsx
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
│   └── identity.js             # Brand identity and API fallback values
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
│   ├── home/                   # Public homepage with premium sections
│   │   ├── components/
│   │   │   ├── FeaturedProjects.jsx
│   │   │   ├── SkillsRadialSection.jsx
│   │   │   ├── EducationTimelineSection.jsx
│   │   │   ├── CertificatesPremiumSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── BlogSection.jsx
│   │   └── pages/
│   │       └── HomePage.jsx
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
│   ├── AnimatedSection.jsx     # Scroll-triggered section wrapper
│   ├── FadeImage.jsx           # Image fade-in with skeleton
│   ├── PageTransition.jsx      # Route transition with AnimatePresence
│   ├── ScrollReveal.jsx        # Scroll reveal with multiple modes (fade, clip, blur, scale)
│   ├── ParallaxLayer.jsx       # Parallax scroll effect
│   ├── ScrollCounter.jsx       # Animated number counters
│   ├── StaggerGrid.jsx         # Staggered children container
│   ├── StaggerItem.jsx         # Staggered child item
│   ├── TextReveal.jsx          # Text-specific reveal
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
- **Adornments** — `Input` supports `startAdornment` / `endAdornment` for icons

### Motion System

The `src/motion/` layer provides:

- Shared easing curves and durations (`ease-out-expo` throughout)
- `ScrollReveal` — 8 reveal modes: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleIn`, `clipUp`, `clipDown`, `blurIn`
- `StaggerGrid` / `StaggerItem` — orchestrated children reveals
- `ScrollCounter` — animated number counters on scroll
- `ParallaxLayer` — parallax scroll effect
- `PageTransition` with `AnimatePresence` for route changes
- `FadeImage` for image loading states with skeleton
- Automatic `prefers-reduced-motion` respect

---

## Performance

- Route-based code splitting with `React.lazy` and `Suspense` (~132 KB initial JS gzipped)
- Manual vendor chunks: React, data layer, charts isolated
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
- Skeleton loaders instead of spinners for layout stability

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Deployment

### Vercel (Recommended)

1. Connect the repository
2. Set environment variables in project settings
3. Deploy on push to `development` branch (preview) or `main` branch (production)

### Other Platforms

```bash
yarn build
```

The `dist/` folder contains the production build.

---

## CI/CD

### GitHub Actions

| Event | What runs |
|-------|-----------|
| Push/PR to `main` or `development` | Lint + Build with Node 22 and Yarn |
| Push to `main` | Deploy to Vercel production |

### Required GitHub Secrets (for deployment)

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## Contributing

This is a personal portfolio project. If you want to use it as a template:

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Ensure `yarn lint` passes with zero warnings
5. Submit a pull request

---

## License

MIT
