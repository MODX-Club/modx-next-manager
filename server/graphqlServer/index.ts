// import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro'

import { schema } from '../nexus'

import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { context, ApiContext } from '../nexus/context'

export default new ApolloServer({
  schema,
  // Run GraphQL playground in dev mode only
  // playground: process.env.NODE_ENV === 'development',
  playground: true,
  formatError(error) {
    if (process.env.NODE_ENV !== 'development') {
      console.error('GraphQL Error', error)
      return new Error('Internal server error')
    }

    return error
  },
  context: async (requestContext: ExpressContext): Promise<ApiContext> => {
    const apiContext = {
      ...context,
      req: requestContext.req,
      res: requestContext.res,
    }

    /**
     * Если есть данные авторизации, пытаемся получить данные пользователя.
     *
     * Пока не делаем этого, так как у нас нет пока работы с данными без запроса к MODX,
     * и на каждый API-запрос будет лишний запрос к MODX
     */
    // if(requestContext.req.headers.authorization && requestContext.req.headers.cookie) {

    //   apiContext.user = await ...
    // }

    return apiContext
  },
})
