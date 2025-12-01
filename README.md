# Airportly

A Next.js application for discovering restaurants and food options near any airport. Users enter an airport code, and the app retrieves nearby food establishments using the Yelp API via Convex backend actions.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Backend | Convex (serverless functions) |
| Styling | Tailwind CSS 4 + shadcn/ui (new-york style) |
| Forms | react-hook-form + zod validation |
| Maps | Leaflet + react-leaflet |
| Carousel | Swiper |
| Animations | Framer Motion |
| API | Yelp Fusion API |

## Project Structure

```
airportly/
├── convex/                    # Convex backend
│   ├── _generated/            # Auto-generated Convex types
│   └── yelp.ts                # Yelp API actions (searchFood, getBusinessDetails)
├── public/
│   ├── images/                # Leaflet marker icons
│   └── waiting.mp4            # Homepage background video
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Convex provider
│   │   ├── page.tsx           # Homepage with video background + search
│   │   ├── globals.css        # Tailwind + CSS variables (dark mode support)
│   │   ├── loading.tsx        # Global loading state
│   │   ├── error.tsx          # Global error boundary
│   │   └── food/
│   │       ├── page.tsx       # Food results grid page
│   │       └── [id]/page.tsx  # Individual restaurant details page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (button, card, badge, etc.)
│   │   ├── providers.tsx      # Convex provider wrapper
│   │   ├── airport-search.tsx # Search form with zod validation
│   │   ├── food-card.tsx      # Restaurant card component
│   │   ├── food-details.tsx   # Full restaurant details with carousel
│   │   └── map.tsx            # Leaflet map component
│   └── lib/
│       ├── utils.ts           # cn() utility for className merging
│       ├── types.ts           # Yelp API TypeScript interfaces
│       └── schemas.ts         # Zod validation schemas
└── package.json
```

## Key Features

- **Airport Search**: Enter any airport code (e.g., LAX, JFK, ORD) to find nearby restaurants
- **Restaurant Grid**: Responsive grid displaying restaurant cards with images, ratings, categories
- **Restaurant Details**: Full details page with image carousel, hours, map, and directions link
- **Interactive Maps**: Leaflet integration showing restaurant location
- **Responsive Design**: Custom breakpoints (mobile: 320px, tablet: 481px, laptop: 769px, desktop: 1024px)

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_CONVEX_URL=<your-convex-deployment-url>
YELP_API_KEY=<your-yelp-api-key>
```

## Getting Started

```bash
# Install dependencies
npm install

# Run Convex development server (in separate terminal)
npx convex dev

# Run Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## User Flow

1. **Homepage** → Enter airport code (e.g., "LAX")
2. **Search** → Convex action calls Yelp API for food within 1 mile of airport
3. **Results** → Grid of restaurant cards (stored in sessionStorage)
4. **Details** → Click card to view full details, photos, hours, and map

## Convex Actions

### `yelp.searchFood`
- **Input**: `airportCode: string`
- **Output**: Array of `YelpBusiness` objects
- Searches for "Food" near specified airport within 1-mile radius

### `yelp.getBusinessDetails`
- **Input**: `businessId: string`
- **Output**: `YelpBusinessDetails` object
- Fetches complete business details including photos and hours

## Component Architecture

| Component | Purpose |
|-----------|---------|
| `AirportSearch` | Form with validation, calls Convex searchFood action |
| `FoodCard` | Display card for restaurant list |
| `FoodDetails` | Full details view with Swiper carousel |
| `Map` | Leaflet map with marker and popup |
| `Providers` | Convex client provider wrapper |

## Styling Notes

- Uses shadcn/ui "new-york" style with Geist font
- CSS variables for theming (light/dark mode support)
- Custom responsive breakpoints: `mobile`, `tablet`, `laptop`, `desktop`
- Tailwind CSS 4 with `@theme inline` configuration

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```
