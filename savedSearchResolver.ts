import {
  ContextValue,
  resolveId,
  resolveRelations,
  simpleReturn,
} from "base-graphql";
import {
  Resolvers,
} from "../../generated-types/type-defs";

const baseSetOffResolvers = {
  id: resolveId,
  uuid: resolveId,
  intialValues: simpleReturn,
  allowedViewModes: simpleReturn,
  relationValues: resolveRelations,
  entityView: simpleReturn,
  teaserMetadata: simpleReturn,
};

export const savedSearchResolver: Resolvers<ContextValue> = {
  SavedSearch: {
    ...baseSetOffResolvers,
  },
  Query: {
  },
  Mutation: {
  },
};
