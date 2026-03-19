# Product sync – integration spec

Spec for pushing product data into this Sanity project from an existing integrations engine. You already have the data; this defines **where to send it**, **what to send**, and **how to map** your records.

---

## 1. Where to send

| | Value |
|---|--------|
| **API** | [Sanity HTTP Mutations](https://www.sanity.io/docs/http-mutations) |
| **URL** | `https://api.sanity.io/v2024-01-01/data/mutate/{dataset}` |
| **Project ID** | `j53lv12c` |
| **Dataset** | `production` |
| **Auth** | Bearer token (Editor scope). Create at [sanity.io/manage](https://sanity.io/manage) → project → API → Tokens. |

**Request:** `POST` with `Authorization: Bearer <token>` and `Content-Type: application/json`.  
**Body:** JSON mutation payload (see below).

---

## 2. Mutation shape

Use **createOrReplace** so each product is upserted by a stable ID.

**Single product:**

```json
{
  "mutations": [
    {
      "createOrReplace": {
        "_id": "product-<stable-id>",
        "_type": "product",
        "name": "...",
        "sku": "...",
        "slug": { "_type": "slug", "current": "..." },
        "shortDescription": "..."
      }
    }
  ]
}
```

**Multiple products:** one object per product in the `mutations` array:

```json
{
  "mutations": [
    { "createOrReplace": { "_id": "product-1", "_type": "product", ... } },
    { "createOrReplace": { "_id": "product-2", "_type": "product", ... } }
  ]
}
```

---

## 3. Field mapping (your data → Sanity)

Map from your **already-extracted** product record to the Sanity document. Send only these fields so Studio-edited content (brand, category, media, SEO, etc.) is not overwritten.

| Sanity field | Type | Required | Map from / rule |
|--------------|------|----------|------------------|
| `_id` | string | yes | `"product-" + slugify(record.sku)` or use `record.id` (Lightspeed UUID) as stable id. Max 128 chars. |
| `_type` | string | yes | Literal `"product"`. |
| `name` | string | yes | `record.name` (product name). For variant products, all variants share this same name; do not use `variant_name` for name. |
| `sku` | string | no | `record.sku`. |
| `lightspeedProductId` | string | no | `record.id` (Lightspeed X-Series product id / UUID). |
| `slug` | object | yes | `{ _type: "slug", current: slugify(record.handle \|\| record.name) }`. Max 96 chars for current. |
| `shortDescription` | string | no | Strip HTML from `record.description` if you have it. |
| `familyName` | string | no | `record.variant_name` when present (e.g. "Bravo / Black / Cotton / Cotton"). Populate on ingestion when it exists; leave empty otherwise. |

**Slugify rule (for `_id` suffix and `slug.current`):** lowercase, replace spaces with `-`, remove characters other than letters, numbers, hyphens; collapse repeated hyphens; trim; cap length at 96 for `slug.current`, 128 for full `_id`.

**Do not send:** `brand`, `categories`, `description`, `media`, `specs`, `useCases`, `compatibleWith`, `seo`. Omit these so the integration only updates core identifiers and copy; rich content stays as edited in Studio. You can add category/brand mapping later and send `categories` (array of category refs) when your engine has resolved them.

---

## 4. Example (one product)

**Your extracted record (example):**

```json
{
  "sku": "REG-ABC-123",
  "name": "Example Cold Water Regulator",
  "shortDescription": "First stage, environmentally sealed."
}
```

**Mapped Sanity document (what to put in `createOrReplace`):**

```json
{
  "_id": "product-reg-abc-123",
  "_type": "product",
  "name": "Example Cold Water Regulator",
  "sku": "REG-ABC-123",
  "slug": { "_type": "slug", "current": "example-cold-water-regulator" },
  "shortDescription": "First stage, environmentally sealed."
}
```

**Mutation body to POST:**

```json
{
  "mutations": [
    {
      "createOrReplace": {
        "_id": "product-reg-abc-123",
        "_type": "product",
        "name": "Example Cold Water Regulator",
        "sku": "REG-ABC-123",
        "slug": { "_type": "slug", "current": "example-cold-water-regulator" },
        "shortDescription": "First stage, environmentally sealed."
      }
    }
  ]
}
```

---

## 5. Lightspeed X-Series payload mapping

When your payload is from Lightspeed X-Series (e.g. GET product record), map as follows:

| Lightspeed field | Sanity field | Notes |
|------------------|--------------|--------|
| `data.id` | `lightspeedProductId` | Product id string. |
| `data.id` | `_id` | Use `"product-" + slugify(data.id)` or store by id if stable. |
| `data.name` | `name` | Product name. For variants, all share this same name; always use `name`, not `variant_name`. |
| `data.variant_name` | `familyName` | Name + concatenated option values (e.g. "Bravo / Black / Cotton / Cotton"). Populate when present on ingestion. |
| `data.handle` | `slug.current` | Slugify if needed; else slugify `name`. |
| `data.sku` | `sku` | |
| `data.description` | `shortDescription` | Strip HTML. |
| `data.brand_id` / `data.brand` | (future) | Resolve to Sanity brand ref when category/brand mapping is in place. |
| `data.categories` | `categories` (future) | Array of refs: resolve each POS category to Sanity category _id; product can map to multiple (e.g. Exposure Protection and Wetsuits). |

`variant_options` (array of `{ name, value }`) is not stored as a separate field; the concatenated `variant_name` is stored in `familyName` for display and lookup.

---

## 6. Summary

- **Where:** `POST https://api.sanity.io/v2024-01-01/data/mutate/production` with Bearer token for project `j53lv12c`.
- **What:** JSON body with `mutations` array of `createOrReplace` objects.
- **Map:** Use the table in §3; include `lightspeedProductId` and `familyName` when your payload has them (see §5 for Lightspeed X-Series). Omit brand, categories, description, media, specs, useCases, seo so Studio edits are preserved.
