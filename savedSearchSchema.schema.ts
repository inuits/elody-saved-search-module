import { gql } from "graphql-modules";

export const savedSearchSchema = gql`
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

  type SavedSearchedEntity implements Entity {
    _key: String
    definition: [Definition]
    # metadata: [SavedSearchesMetadata]!
    user: String
    id: String!
    uuid: String!
    type: String!
    media: Media
    teaserMetadata: teaserMetadata
    permission: [Permission]
    intialValues: IntialValues!
    relationValues: RelationValues
    entityView: ColumnList!
    advancedFilters: AdvancedFilters
    sortOptions: SortOptions
    createFormFields: FormFields
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
    createSavedSearch(savedSearchInput: SavedSearchInput!): SavedSearchedEntity
    deleteSavedSearch(uuid: String!): String
    patchSavedSearchTitle(uuid: String!, title: String!): SavedSearchedEntity
    patchSavedSearchDefinition(
      uuid: String!
      definition: [FilterInput!]!
    ): SavedSearchedEntity
    getSavedSearchById(uuid: String!): SavedSearchedEntity
  }
`;
