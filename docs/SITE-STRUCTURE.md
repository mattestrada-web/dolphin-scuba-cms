# Site structure & workflows

How the Studio is organized and how it maps to the website.

## How reference fields work (Homepage cards)

You **don’t** “pull into a folder.” It works the other way:

1. **Homepage** (and landings) have **reference fields** — e.g. “Featured Products”, “Featured Trips”, “Featured Scuba Classes”, “Featured Swim Lessons”.
2. Each of those fields stores **pointers** to other documents (by ID). When you’re editing the Homepage, the field shows a **reference input**: you search or browse and **pick** which products, trips, or classes to feature.
3. The **lists in the desk** (e.g. under “Featured content (Homepage cards)”) are just **where those documents live** — where you create and edit them. The Homepage doesn’t “pull” them anywhere; it only stores references to whichever documents you chose.

So: **create/edit the items** in the right list (Products, Trips, or under Site → Featured content for class/lesson refs), then **open Homepage** and use the reference fields to select which ones appear in each card section. One list per type is enough; no separate “folder” per section.

**Current setup:**

- **Featured Products** → pick from **Products** (main catalog).
- **Featured Trips** → pick from **Travel → Trips** (canonical trips).
- **Featured Scuba Classes** → pick from **Site → Featured content → Scuba Class References** (until a full Classes type exists).
- **Featured Swim Lessons** → pick from **Site → Featured content → Swim Lesson References** (until a full Swim type exists).

Product References and Trip References are still under Featured content for legacy/sync; the Homepage itself uses the main Product and Trip catalogs.

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
| → Featured content (Homepage cards) | Product / Trip / Scuba Class / Swim Lesson references — where you create the items that can be *picked* on Homepage (and landings) | — |
| **Products** | Catalog; each product = one dynamic page | `/shop/[slug]` |
| **Scuba** | SEO / programmatic pages | `/best/...` or as configured |
| **Travel** | Trips (master), departures, destinations, vessels, packages, add-ons, itineraries, bookings | `/trips/[slug]` from trip.slug |
| **Operations** | Staff (instructors for trips/classes); classes/events later | — |

## Workflows

- **Editing the homepage**  
  Site → Homepage. Configure carousel and featured products/trips/classes/lessons. Featured products come from the main **Products** list.

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
