<p align="center">
  <svg width="96" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <path fill="#55b9a7" d="M 54.878 248.942 C 40.536 215.22 22.759 182.66 16.294 145.866 C 13.784 132.848 12.206 119.661 11.579 106.412 C 9.425 30.574 56.091 -9.975 130.435 2.107 C 177.572 9.753 218.313 32.417 258.919 55.625 C 278.179 73.989 303.565 85.184 319.524 107.64 C 298.918 118.562 278.111 129.074 257.841 140.544 C 246.567 147.364 232.92 148.859 220.467 144.639 C 185.584 134.33 150.233 125.662 114.945 116.65 C 106.192 114.467 96.225 109.007 88.953 119.381 C 82.759 128.187 88.482 136.311 92.32 144.093 C 109.29 178.359 126.327 212.491 143.429 246.484 C 148.041 253.2 149.813 261.508 148.347 269.556 C 141.208 295.017 134.271 320.549 127.271 346.009 C 97.911 317.75 77.776 282.322 54.878 248.942 Z"/>
    <path fill="#096c73" d="M 319.39 107.64 C 303.565 85.184 278.179 73.989 258.783 55.625 C 304.036 26.138 353.059 8.798 406.931 9.959 C 475.214 11.325 512.453 67.164 496.223 141.566 C 488.526 175.397 475.859 207.867 458.649 237.882 C 454.473 245.529 448.411 252.628 449.962 262.389 C 440.196 264.504 437.235 273.858 432.117 280.614 C 420.129 296.178 409.893 313.109 394.206 325.462 C 378.783 303.003 369.828 277.065 356.359 253.584 C 350.872 244.059 349.834 232.557 353.53 222.183 C 364.171 184.844 373.733 147.097 383.229 109.416 C 385.112 102.248 387.134 94.739 380.94 88.938 C 373.665 82.109 366.191 85.933 358.852 89.415 C 345.718 95.491 332.588 101.361 319.39 107.64 Z"/>
    <path fill="#165c74" d="M 394.206 325.531 C 409.893 313.174 420.129 296.247 432.117 280.683 C 437.235 273.858 440.196 264.573 449.962 262.456 C 468.092 296.173 480.798 332.603 487.604 370.377 C 503.091 463.758 445.718 517.14 354.473 495.023 C 313.465 485.125 277.708 464.101 241.006 444.783 L 178.38 393.86 C 200.199 382.325 222.284 371.198 243.833 359.116 C 254.419 352.67 267.236 351.175 278.986 355.018 C 315.887 365.601 353.059 374.61 390.501 384.439 C 397.773 386.351 404.709 388.195 410.703 381.778 C 417.907 374.132 413.261 366.759 410.029 359.457 C 404.641 348.055 399.388 336.795 394.206 325.531 Z"/>
    <path fill="#355ba9" d="M 178.38 393.86 L 241.276 444.783 C 189.627 479.392 133.129 497.21 71.443 487.514 C 22.691 479.87 -5.189 435.089 0.805 378.705 C 5.519 334.677 22.691 294.676 45.115 256.995 C 47.201 253.515 51.848 251.605 55.149 248.942 C 78.044 282.322 98.178 317.75 127.403 346.281 C 124.105 362.118 120.67 377.886 117.706 394.065 C 114.608 410.994 122.959 418.365 138.583 412.154 C 151.781 406.49 164.914 399.936 178.38 393.86 Z"/>
  </svg>
</p>

<p align="center">Part of <a href="https://elody.eu">Elody</a> — the open semantic data platform.</p>

# Saved Search Module

A schema-only `graphql-modules` module that adds the `SavedSearch` entity type to the Elody GraphQL surface. No data sources, no Express endpoints, no custom resolver logic — a saved search is just an entity managed by collection-api via the base `CollectionAPI` data source. This module's job is to declare the type and expose the client-side query fragments the PWA uses to build the "save this search" form.

## What's included

| Layer | What it adds |
|-------|-------------|
| GraphQL schema | `SavedSearch` type (implements the base `Entity` interface), `Entitytyping.saved_search` enum value, `BaseFieldType.privacyTypeField` for the privacy dropdown |
| GraphQL resolvers | Field resolvers for `SavedSearch` — all delegate to base-graphql helpers (`resolveId`, `resolveRelations`, `simpleReturn`) |
| Client queries | Fragments (`minimalSavedSearch`, `fullSavedSearch`, `savedSearchSortOptions`, `filtersForSavedSearch`) and one query (`GetSaveSearchForm`) consumed by the PWA |
| DataSources | None — persistence goes through `CollectionAPI` from `base-graphql` |
| Express endpoints | None |

---

## GraphQL API

### Types

```graphql
type SavedSearch implements Entity {
  id: String!
  uuid: String!
  type: String!
  intialValues: [MetaData]!
  entityView: EntityView!
  teaserMetadata: [MetaData]
  allowedViewModes: [ViewMode]
  relationValues: [Relation]
  advancedFilters: [AdvancedFilter]
  sortOptions: [SortOption]
  bulkOperationOptions: BulkOperationOptions
  previewComponent: PreviewComponent
  deleteQueryOptions: DeleteQueryOptions
  mapElement: MapElement
}

enum Entitytyping { saved_search, ... }
enum BaseFieldType { privacyTypeField, ... }
```

### Queries / Mutations

None declared by this module. Saved searches are read via the standard base `Entity` / `Entities` queries (with `type: saved_search`) and created via the standard `mutateEntityValues` / `CreateEntity` flow — same as any other entity type.

---

## Client-side queries

The `queries/savedSearch.queries.ts` file exports fragments and one query the PWA imports directly:

| Export | Purpose |
|--------|---------|
| `minimalSavedSearch` | Fragment: title + filters from metadata. Use in list views. |
| `fullSavedSearch` | Fragment: all metadata (title, applicable_type, filters, privacy) plus `relationValues` and the full `entityView` with metadata panels. Use in detail views. |
| `savedSearchSortOptions` | Fragment: sort-by-title config. |
| `filtersForSavedSearch` | Fragment: advanced filters for user, title, type, applicable_type. |
| `GetSaveSearchForm` | Query: fetches the dynamic form for creating/editing a saved search (title, privacy, submit action). Wraps base's `GetDynamicForm`. |

Frontend codegen picks these up alongside the client's own queries — no server-side counterpart is needed.

---

## Using the module

Import and add it to `customModuleConfig.modules`:

```ts
import start, { ElodyModuleConfig } from 'base-graphql';
import { savedSearchModule } from 'saved-search-module';

const config: ElodyModuleConfig = {
  modules: [savedSearchModule, /* ... */],
  dataSources: { /* ... */ },
};

start({ customModuleConfig: config, /* ... */ });
```

No data sources or endpoints to wire in — the module is stateless from the server's point of view. Saved searches are stored, indexed, and queried by collection-api like any other entity.

---

## Extending

If a deployment needs a bespoke privacy model, extra fields, or a custom submit action, do it in the client's own schema/queries — this module is intentionally thin. Adding backend logic here is only justified if it's shared across multiple clients; per-client behavior belongs in the client's own configuration.
