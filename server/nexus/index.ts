import { makeSchema, asNexusMethod } from 'nexus'

import { GraphQLDateTime } from 'graphql-iso-date'

import * as types from './types'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

/**
 * Приходится указывать абсолютный путь через процесс,
 * так как при импорте из фронта next-js перебивает пути
 */
// https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
const cwd = process.cwd()

export const schema = makeSchema({
  /**
   * Надо будет перепроверить правильно ли использовать эти настройки
   */
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  // shouldExitAfterGenerateArtifacts: process.env.NODE_ENV !== 'development',
  plugins: [],
  types: {
    ...types,
    DateTime,
  },
  outputs: {
    schema: cwd + '/server/nexus/generated/schema.graphql',
    typegen: cwd + '/server/nexus/generated/nexus.ts',
  },
  contextType: {
    // module: require.resolve('./context'),
    module: cwd + '/server/nexus/context.ts',
    export: 'ApiContext',
  },
  sourceTypes: {
    debug: process.env.NODE_ENV === 'development',
    modules: [],
  },
  // prettierConfig:
  //   process.env.NODE_ENV === 'development'
  //     ? require.resolve(process.cwd() + '/.prettierrc')
  //     : undefined,
})
