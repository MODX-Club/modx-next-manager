import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { signin, users } from './resolvers'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.nonNull.boolean('active')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.list.nonNull.field('users', {
      description: 'Список пользователей',
      type: 'User',
      args: {
        // where: nonNull('UserWhereUniqueInput'),
        // data: nonNull('UserSigninDataInput'),
      },
      resolve: users,
    })
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signin', {
      description: 'Авторизация',
      type: 'String',
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        login_context: stringArg(),
        username: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: signin,
    })
  },
})
