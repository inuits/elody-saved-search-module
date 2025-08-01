import { gql } from "graphql-modules";

export const savedSearch = gql`
  fragment minimalSavedSearch on SavedSearch {
    intialValues {
      title: keyValue(key: "title", source: metadata)
      filters: keyValue(key: "filters", source: metadata)
    }
    allowedViewModes {
      viewModes(input: [
        { viewMode: ViewModesList }
        { viewMode: ViewModesGrid }
      ]) {
        ...viewModes
      }
    }
    teaserMetadata {
      title: metaData {
        label(input: "metadata.labels.title")
        key(input: "title")
      }
    }
    ...minimalBaseEntity
  }

  fragment fullSavedSearch on SavedSearch {
    intialValues {
      applicable_type: keyValue(key: "applicable_type", source: metadata)
      filters: keyValue(key: "filters", source: metadata)
      privacy: keyValue(key: "privacy", source: metadata)
      title: keyValue(key: "title", source: metadata)
    }
    relationValues
    entityView {
      column {
        size(size: seventy)
        elements {
          windowElement {
            label(input: "window-element-labels.info-window")
            expandButtonOptions {
              shown(input: true)
            }
            info: panels {
              label(input: "panel-labels.keyword-info")
              panelType(input: metadata)
              isCollapsed(input: false)
              isEditable(input: true)
              title: metaData {
                label(input: "metadata.labels.title")
                key(input: "title")
                inputField(type: baseTextField) {
                  ...inputfield
                  validation(input: { value: required }) {
                    ...validation
                  }
                }
              }
              privacy: metaData {
                label(input: "metadata.labels.privacy")
                key(input: "privacy")
                inputField(type: privacyTypeField) {
                  validation(input: { value: required }) {
                    ...validation
                  }
                  ...inputfield
                }
              }
            }
          }
        }
      }
    }
  }

  fragment savedSearchSortOptions on SavedSearch {
    sortOptions {
      options(
        input: [
          { icon: NoIcon, label: "metadata.labels.title", value: "title" }
        ]
      ) {
        icon
        label
        value
      }
    }
  }

  fragment filtersForSavedSearch on SavedSearch {
    advancedFilters {
      user: advancedFilter(
        type: selection
        key: ["elody:1|relations.hasUser.key"]
        label: "metadata.labels.user"
        isDisplayedByDefault: true
        advancedFilterInputForRetrievingOptions: [
          {
            type: text
            key: ["elody:1|relations.hasUser.key"]
            value: "*"
            metadata_key_as_label: "metadata.email.value"
            item_types: ["saved_search"]
          }
        ]
      ) {
        type
        key
        label
        isDisplayedByDefault
        advancedFilterInputForRetrievingOptions {
          type
          key
          value
          metadata_key_as_label
          item_types
        }
        defaultValue(value: "session-$email")
        tooltip(value: true)
      }
      title: advancedFilter(
        type: text
        key: ["elody:1|metadata.title.value"]
        label: "metadata.labels.title"
        isDisplayedByDefault: true
      ) {
        type
        key
        label
        isDisplayedByDefault
        tooltip(value: true)
      }
      type: advancedFilter(type: type) {
        type
        defaultValue(value: "saved_search")
        hidden(value: true)
      }
      applicable_type: advancedFilter(
        type: text
        key: ["elody:1|metadata.applicable_type.value"]
      ) {
        type
        key
        hidden(value: true)
        defaultValue(value: "entityType")
      }
    }
  }

  query GetSaveSearchForm {
    GetDynamicForm {
      label(input: "saved-searches.search-modal-title")
      keyword: formTab {
        formFields {
          title: metaData {
            label(input: "metadata.labels.title")
            key(input: "title")
            inputField(type: baseTextField) {
              ...inputfield
              validation(input: { value: required }) {
                ...validation
              }
            }
          }
          privacy: metaData {
            label(input: "metadata.labels.privacy")
            key(input: "privacy")
            inputField(type: privacyTypeField) {
              validation(input: { value: required }) {
                ...validation
              }
              ...inputfield
            }
          }
          createAction: action {
            label(input: "actions.labels.create")
            icon(input: Create)
            actionType(input: submitWithExtraMetadata)
            actionQuery(input: "CreateEntity")
            creationType(input: saved_search)
          }
        }
      }
    }
  }
`
