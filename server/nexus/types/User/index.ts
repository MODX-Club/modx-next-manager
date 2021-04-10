import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { NexusGenScalars } from '../../generated/nexus'
import { signin, usersConnection, user } from './resolvers'

import moment from 'moment'

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
  fullname: string | null
  email: string | null
  blocked: boolean
  cls?: string
  remote_key: null | unknown
  remote_data: null | unknown

  // ['web', 'mgr']
  session_stale: string[] | null
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
  sourceType: {
    module: process.cwd() + '/server/nexus/types/User',
    export: 'MODXListUser',
  },
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.string('fullname')
    t.string('email')
    t.nonNull.boolean('active')
    t.nonNull.boolean('blocked')
    t.nonNull.field('createdon', {
      type: 'DateTime',
      resolve(user) {
        return moment(user.createdon).toDate()
      },
    })
    t.string('cls', {
      description:
        'Классы для оформления меню в зависимости от статуса пользователя',
    })
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
  description: 'Условие поиска уникального пользователя',
  definition(t) {
    t.nonNull.int('id')
  },
})

export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  description: 'Условия поиска пользователей',
  definition(t) {
    t.string('query', {
      description: 'Поиск по юзернейму, имени, емейлу',
    })
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
        where: arg({
          type: 'UserWhereInput',
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
