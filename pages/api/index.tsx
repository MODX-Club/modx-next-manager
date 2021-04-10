import { ExpressContext } from 'apollo-server-express'
import { ApolloServer } from 'apollo-server-micro'
import { ApiContext, context } from 'server/nexus/context'

import { schema } from '../../server/nexus'

const server = new ApolloServer({
  schema,

  context: async (requestContext: ExpressContext): Promise<ApiContext> => {
    // console.log('requestContext.res.json', requestContext.res.json);

    const apiContext = {
      ...context,
      req: requestContext.req,
      res: requestContext.res,
    }

    // requestContext.res.json({
    //   cookies: "dsfsdfsdf=wefwefwef",
    // })

    return apiContext
  },
})

export default server.createHandler({
  path: '/api',
})

export const config = {
  api: {
    bodyParser: false,
  },
}
