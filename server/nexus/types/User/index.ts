import {
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { NexusGenScalars } from 'server/nexus/generated/nexus'
import { signin, usersConnection, user } from './resolvers'

/**
 * Тип ответа от MODX
 */

/**
 * Объект пользователя в списке пользователей
 */
export type MODXListUser = {
  id: number
  class_key: string
  username: string
  active: boolean
  primary_group: number
  sudo: boolean
  createdon: NexusGenScalars['DateTime']
  fullname: string
  email: string
  blocked: boolean
  cls?: string
  remote_key: null | unknown
  remote_data: null | unknown
  session_stale: null | unknown
  hash_class: string
}

/**
 * Объект пользователя
 */
export type MODXUser = MODXListUser & {
  internalKey: number
  phone: string
  mobilephone: string
  blockeduntil: string
  blockedafter: string
  logincount: 86
  lastlogin: NexusGenScalars['DateTime']
  thislogin: number
  failedlogincount: number
  sessionid: string
  dob: string
  gender: number
  address: string
  country: string
  city: string
  state: string
  zip: string
  fax: string
  photo: string
  comment: string
  website: string
  extended: null
  salt: string
}

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.nonNull.boolean('active')
  },
})

export const UsersConnectionResponse = objectType({
  name: 'UsersConnectionResponse',
  description: 'Список пользователей с указанием общего количества',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      description: 'Список пользователей',
      type: 'User',
    })

    t.nonNull.int('total', {
      description: 'Общее количество пользователей',
    })
  },
})

export const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.nonNull.int('id')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('me', {
      type: 'User',
      description: 'Current authorized user',
      args: {
        where: nonNull('UserWhereUniqueInput'),
      },
      resolve: async (source, args, ctx, info) => {
        try {
          return await user(source, args, ctx, info)
        } catch (error) {
          //
        }

        return null
      },
    })

    t.field('user', {
      type: 'User',
      args: {
        where: nonNull('UserWhereUniqueInput'),
      },
      resolve: user,
    })

    t.nonNull.field('usersConnection', {
      description: 'Список пользователей с указанием общего количества',
      type: 'UsersConnectionResponse',
      args: {
        start: intArg({
          description: 'Сколько записей пропустить',
        }),
        limit: intArg({
          description: 'Сколько всего записей получить',
        }),
      },
      resolve: usersConnection,
    })
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token')

    t.nonNull.int('userId', {})
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signin', {
      description: 'Авторизация',
      type: 'AuthPayload',
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
