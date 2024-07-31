import { gql } from "graphql-modules";

export const savedSearchSchema = gql`
  enum Entitytyping {
    savedSearch
  }

  enum BaseFieldType {
    privacyTypeField
  }

  type MinMax {
    min: Int
    max: Int
    isRelation: Boolean
  }

  type Text {
    value: String
  }

  type MultiSelect {
    value: [String]
    AndOrValue: Boolean
  }

  enum SearchInputType {
    AdvancedSavedSearchType
  }

  type SavedSearchesResults {
    results: [SavedSearchedEntity]
    count: Int
    limit: Int
  }

  type SavedSearch on Entity {
    _key: String
    definition: [Definition]
    user: String
    id: String!
    uuid: String!
    type: String!
    teaserMetadata: teaserMetadata
    intialValues: IntialValues!
    allowedViewModes: AllowedViewModes
    relationValues: JSON
    entityView: ColumnList!
    advancedFilters: AdvancedFilters
    sortOptions: SortOptions
    createFormFields: FormFields
    bulkOperationOptions: BulkOperationOptions
    deleteQueryOptions: DeleteQueryOptions
  }

  type SavedSearchesMetadata {
    key: String
    value: String
    lang: String
  }

  type Definition {
    _id: String!
    type: String!
    minMaxInput: MinMax
    textInput: Text
    multiSelectInput: MultiSelect
    key: String!
  }

  input SavedSearchMetadataInput {
    lang: String
    value: String
    key: String
  }

  input SavedSearchInput {
    type: String
    private: Boolean
    metadata: [SavedSearchMetadataInput]
    definition: [FilterInput!]!
  }

  type Mutation {
    savedSearches: EntitiesResults
    createSavedSearch(savedSearchInput: SavedSearchInput!): SavedSearch
    deleteSavedSearch(uuid: String!): String
    patchSavedSearchTitle(uuid: String!, title: String!): SavedSearch
    patchSavedSearchDefinition(
      uuid: String!
      definition: [FilterInput!]!
    ): SavedSearch
    getSavedSearchById(uuid: String!): SavedSearch
  }
`;
