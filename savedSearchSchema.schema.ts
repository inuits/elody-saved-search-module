import { gql } from "graphql-modules";

export const savedSearchSchema = gql`
  enum Entitytyping {
    savedSearch
  }

  enum BaseFieldType {
    privacyTypeField
  }

  type SavedSearch implements Entity {
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
    bulkOperationOptions: BulkOperationOptions
    deleteQueryOptions: DeleteQueryOptions
  }
`;
