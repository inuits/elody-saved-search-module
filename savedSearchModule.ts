import { createModule } from 'graphql-modules';
import { savedSearchSchema } from './savedSearchSchema.schema';

const savedSearchModule = createModule({
  id: 'savedSearchModule',
  dirname: __dirname,
  typeDefs: [savedSearchSchema],
});

export { savedSearchModule, savedSearchSchema };
