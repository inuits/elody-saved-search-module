export const SAVED_SEARCH_CREATE_PERMISSION = 'create:saved_search';

export const savedSearchPermissions = {
  [SAVED_SEARCH_CREATE_PERMISSION]: {
    datasource: 'CollectionAPI',
    crud: 'post',
    uri: '/entities',
    body: { type: 'saved_search' },
  },
};
