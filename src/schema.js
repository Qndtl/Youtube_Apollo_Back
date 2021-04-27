import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const allTypeDefs = loadFilesSync(`${__dirname}/api/**/*.graphql`);
const allResolvers = loadFilesSync(`${__dirname}/api/**/*.js`);

export const typeDefs = mergeTypeDefs(allTypeDefs);
export const resolvers = mergeResolvers(allResolvers);