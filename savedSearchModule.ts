import { createModule } from 'graphql-modules';
import { savedSearchSchema } from './savedSearchSchema.schema';
import { savedSearchResolver } from './savedSearchResolver';
import {
  SAVED_SEARCH_CREATE_PERMISSION,
  savedSearchPermissions,
} from './savedSearchPermissions';

// Installing the module is what turns saved search on: it carries the feature
// flag and the permission that gates it, so clients configure nothing.
const savedSearchModule = Object.assign(
  createModule({
    id: 'savedSearchModule',
    dirname: __dirname,
    typeDefs: [savedSearchSchema],
    resolvers: [savedSearchResolver],
  }),
  {
    elodyPermissions: savedSearchPermissions,
    elodyFeatures: {
      savedSearch: {
        enabled: true,
        permission: SAVED_SEARCH_CREATE_PERMISSION,
      },
    },
  }
);

export {
  savedSearchModule,
  savedSearchSchema,
  savedSearchPermissions,
  SAVED_SEARCH_CREATE_PERMISSION,
};
