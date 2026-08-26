<p align="center">
  <a href="https://elody.eu"><img src="https://elody.eu/images/logo.svg" alt="Elody" width="96" /></a>
</p>

<p align="center">Part of <a href="https://elody.eu">Elody</a> — the open semantic data platform.<br /><a href="https://docs.elody.eu">Documentation</a> · <a href="https://elody.eu">Website</a></p>

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
