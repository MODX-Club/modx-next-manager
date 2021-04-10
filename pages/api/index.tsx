import { ExpressContext } from 'apollo-server-express'
import { ApolloServer } from 'apollo-server-micro'

import { schema } from '../../server/nexus'

import { ApiContext, context } from '../../server/nexus/context'

/**
 * vercel.com не поддерживает /server, создаем отдельную страницу для API-запросов
 */
const server = new ApolloServer({
  schema,

  context: async (requestContext: ExpressContext): Promise<ApiContext> => {
    const apiContext = {
      ...context,
      req: requestContext.req,
      res: requestContext.res,
    }

    return apiContext
  },
})

/**
 * Этот конфиг обязательный, иначе будет висеть запрос бесконечно
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api',
})
