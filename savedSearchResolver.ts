import { Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const savedSearchResolver: Resolvers<ContextValue> = {
  // Mutation: {
  //   savedSearches: async (_source, {}, { dataSources }) => {
  //     return dataSources.CollectionAPI.getSavedSearches(5, 1, {
  //       value: "",
  //       isAsc: false,
  //       key: "",
  //     });
  //   },
  //   createSavedSearch: async (
  //     _source,
  //     { savedSearchInput },
  //     { dataSources },
  //   ) => {
  //     return dataSources.CollectionAPI.createSavedSearch(savedSearchInput);
  //   },
  //   deleteSavedSearch: async (_source, { uuid }, { dataSources }) => {
  //     return dataSources.CollectionAPI.deleteSavedSearch(uuid);
  //   },
  //   patchSavedSearchTitle: async (
  //     _source,
  //     { uuid, title },
  //     { dataSources },
  //   ) => {
  //     return dataSources.CollectionAPI.patchSavedSearchTitle(uuid, title);
  //   },
  //   patchSavedSearchDefinition: async (
  //     _source,
  //     { uuid, definition },
  //     { dataSources },
  //   ) => {
  //     return dataSources.CollectionAPI.patchSavedSearchDefinition(
  //       uuid,
  //       definition,
  //     );
  //   },
  //   getSavedSearchById: async (_source, { uuid }, { dataSources }) => {
  //     return dataSources.CollectionAPI.getSavedSearchById(uuid);
  //   },
  // },
};
