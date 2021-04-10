import { makeSchema, asNexusMethod } from 'nexus'

import { GraphQLDateTime } from 'graphql-iso-date'

import * as types from './types'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

export const schema = makeSchema({
  /**
   * Надо будет перепроверить правильно ли использовать эти настройки
   */
  // shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  // shouldExitAfterGenerateArtifacts: process.env.NODE_ENV !== 'development',
  plugins: [],
  types: {
    ...types,
    DateTime,
  },
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
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
