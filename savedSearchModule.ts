import { createModule } from 'graphql-modules';
import { savedSearchSchema } from './savedSearchSchema.schema';
import { savedSearchResolver } from './savedSearchResolver';

const savedSearchModule = createModule({
  id: 'savedSearchModule',
  dirname: __dirname,
  typeDefs: [savedSearchSchema],
  resolvers: [savedSearchResolver],
});

export { savedSearchModule, savedSearchResolver, savedSearchSchema };
