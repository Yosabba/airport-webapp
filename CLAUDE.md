# Airportly - Claude Code Instructions

> For comprehensive project documentation, see [README.md](./README.md)

## Project Overview

Airport food discovery app using Next.js 16 + Convex + Yelp API. Users search by airport code to find nearby restaurants.

## Tech Stack Summary

- **Framework**: Next.js 16 (App Router) + React 19
- **Backend**: Convex serverless functions
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style)
- **Forms**: react-hook-form + zod
- **Maps**: Leaflet + react-leaflet
- **API**: Yelp Fusion API

## Key Patterns

### Component Organization
```
src/components/ui/     → shadcn/ui primitives (button, card, badge, etc.)
src/components/*.tsx   → feature components (airport-search, food-card, etc.)
src/lib/              → utilities, types, schemas
convex/               → backend actions (yelp.ts)
```

### Import Aliases
```typescript
@/components  → src/components
@/lib         → src/lib
@/hooks       → src/hooks
```

### Form Pattern
```typescript
// Use react-hook-form + zodResolver + zod schemas
const form = useForm<T>({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});
```

### Convex Actions
```typescript
// Use "use node" directive for server-side actions
// Actions defined in convex/yelp.ts
const searchFood = useAction(api.yelp.searchFood);
const getBusinessDetails = useAction(api.yelp.getBusinessDetails);
```

### Leaflet Map (SSR Fix)
```typescript
// Always use dynamic import to avoid SSR issues
const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => <LoadingState />
});
```

## Custom Breakpoints

Use these Tailwind breakpoints (defined in globals.css):
- `mobile`: 320px
- `tablet`: 481px
- `laptop`: 769px
- `desktop`: 1024px

Example: `tablet:grid-cols-2 desktop:grid-cols-3`

## Convex Conventions

### Actions (convex/yelp.ts)
- Use `"use node"` directive for Node.js runtime
- Access env vars via `process.env.YELP_API_KEY`
- Define actions with `action()` from `convex/_generated/server`
- Use `v` from `convex/values` for argument validation

### Existing Actions
- `yelp.searchFood({ airportCode })` → Search restaurants near airport
- `yelp.getBusinessDetails({ businessId })` → Get full business details

## Type Definitions

Located in `src/lib/types.ts`:
- `YelpBusiness` - Basic business info (list view)
- `YelpBusinessDetails` - Extended info with photos/hours (detail view)
- `YelpCategory`, `YelpLocation`, `YelpCoordinates`, `YelpHours`

## Styling Guidelines

### shadcn/ui Components Available
- Button, Card, CardContent, Badge, Input, Label
- Dialog, DialogContent, DialogHeader, etc.
- Form, FormControl, FormField, FormItem, FormMessage

### CSS Variables
Light/dark mode supported via CSS variables in `globals.css`:
- `--background`, `--foreground`
- `--primary`, `--secondary`, `--muted`, `--accent`
- `--destructive`, `--border`, `--input`, `--ring`

## Development Commands

```bash
npm run dev          # Next.js dev server
npx convex dev       # Convex dev server (run in separate terminal)
npx tsc --noEmit     # Type check (prefer over npm run build)
npm run lint         # ESLint
```

## Environment Variables

```env
NEXT_PUBLIC_CONVEX_URL=<convex-url>
YELP_API_KEY=<yelp-api-key>
```

## Common Tasks

### Add New shadcn/ui Component
```bash
npx shadcn@latest add <component-name>
```

### Add New Convex Action
1. Add action to `convex/yelp.ts` (or create new file)
2. Use `"use node"` if accessing environment variables
3. Import and use via `useAction(api.module.actionName)`

### Add New Route
1. Create `src/app/<route>/page.tsx`
2. Use "use client" for client components
3. Dynamic routes: `src/app/<route>/[param]/page.tsx`

### Add New Type
1. Add to `src/lib/types.ts`
2. Import with `import type { TypeName } from "@/lib/types"`

## Things to Avoid

- Don't use `npm run build` for type checking, use `npx tsc --noEmit`
- Don't duplicate Convex mutations/queries that already exist
- Don't add Leaflet without dynamic import (SSR breaks)
- Don't use inline styles - use Tailwind classes
- Don't skip zod validation on forms

## Session Storage Pattern

Food search results are cached in sessionStorage:
```typescript
sessionStorage.setItem("foodResults", JSON.stringify(results));
sessionStorage.setItem("airportCode", data.airportCode);
```

This avoids re-fetching when navigating between list and detail views.
