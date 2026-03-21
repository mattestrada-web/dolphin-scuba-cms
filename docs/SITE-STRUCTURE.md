# Site structure & workflows

How the Studio is organized and how it maps to the website.

## How reference fields work

Homepage and landing-page merchandising fields should point **directly** at the canonical document types.

That means:

1. Create or edit the real document in its home section.
2. Open `Homepage` or the relevant `Landing Page`.
3. Add a direct reference there.

Current intended flow:

- **Featured Products** → direct references to **Products**
- **Featured Trips** → direct references to **Travel → Trips**
- **Featured travel discovery items** → direct references to **Travel → Regions** or **Travel → Themes**

For swim and scuba classes, the long-term direction is the same: direct references from homepage/landing documents into the canonical class/lesson types once those models are ready. Avoid building extra “reference of a reference” layers unless a sync/integration workflow truly requires it.

## Studio desk order

| Section | Purpose | URL mapping |
|--------|---------|-------------|
| **Site** | One-off pages and shared components | |
| → Homepage | Singleton: hero carousel + featured items | `/` |
| → Landing Pages | One config doc per section | |
| → → Shop / Webstore | Featured products, intro, hero | `/shop` (or slug) |
| → → Trips | Featured trips, intro, hero | `/trips` |
| → → Scuba Classes | Featured classes, intro, hero | `/classes` |
| → → Swim Lessons | Featured swim lessons, intro, hero | `/swim` |
| → Carousel Slides | Reusable slides (used by Homepage) | — |
| **Products** | Catalog; each product = one dynamic page | `/shop/[slug]` |
| **Scuba** | SEO / programmatic pages | `/best/...` or as configured |
| **Travel** | Trips (master), departures, destinations, vessels, packages, add-ons, itineraries, bookings | `/trips/[slug]` from trip.slug |
| **Operations** | Staff (instructors for trips/classes); classes/events later | — |

## Workflows

- **Editing the homepage**  
  Site → Homepage. Configure carousel and featured products/trips/classes/lessons using direct references to the canonical documents.

- **Editing a section landing (e.g. Shop)**  
  Site → Landing Pages → Shop / Webstore. Set hero, intro, and featured products. Same products appear in the catalog and on dynamic product pages.

- **Adding a product**  
  Products → Products. Each document gets a slug; use it for `/shop/[slug]` on the frontend.

- **Adding a trip**  
  Travel → Trips. Trip = master entity (template); add Departures for specific dates. Trip connects to destination, vessel, use cases, recommended products. WeTravel sync: push trip/departure to WeTravel; pull bookings back.

- **Adding a class**  
  When the class type exists: Operations → Classes; use slug for `/classes/[slug]`.

- **Programmatic SEO (e.g. “Best cold water regulators”)**  
  Scuba → SEO Pages. These drive listing pages filtered by use case / specs; they don’t need a 1:1 “landing” doc.

## URL ↔ content summary

| URL pattern | Content source |
|-------------|----------------|
| `/` | Homepage (documentId: `homepage`) |
| `/shop` | Landing page (documentId: `landing-shop`) |
| `/trips` | Landing page (documentId: `landing-trips`) |
| `/classes` | Landing page (documentId: `landing-classes`) |
| `/swim` | Landing page (documentId: `landing-swim`) |
| `/shop/[slug]` | Product document with matching `slug.current` |
| `/trips/[slug]` | Trip document (when type exists) |
| `/classes/[slug]` | Class document (when type exists) |

Use each landing’s `slug` field if you want different paths (e.g. `store` instead of `shop`).

## Travel: CMS = canonical, WeTravel = booking

- **Trip** = master entity (template), not a single departure. Connects: destination, vessel, use cases, recommended products, required certs.
- **Departure** = one date range + capacity + packages/add-ons; maps 1:1 to WeTravel. Push to WeTravel for booking; pull bookings back.
- **Booking** = read-only, ingested from WeTravel API.
- Trips landing page (Site → Landing Pages → Trips) features documents from Travel → Trips.

## Delivery model for website traffic

For public website delivery, do **not** treat Sanity as a high-chatter browser API.

Use this boundary:

- **Sanity** = editorial source of truth + hosted assets
- **Flipper2** = aggregation/sync/enrichment layer
- **dolphin-website** = renderer

That means:

- Homepage, shop rails, and other merchandising surfaces should prefer **server-side cached payloads** or build/revalidation fetches.
- The frontend should **not** make one Sanity query per card/module in the browser.
- Product/shop experiences should eventually consume a **single aggregated payload** from Flipper2 that merges Sanity merchandising with ERP/Ecwid commerce data.
- Sanity asset URLs are fine to serve publicly once imported; the expensive pattern to avoid is lots of runtime content queries from the browser.
