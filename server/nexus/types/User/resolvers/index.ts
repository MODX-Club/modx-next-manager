/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import { FieldResolver } from 'nexus'
import { NexusGenObjects } from '../../../generated/nexus'
import { MODXListUser, MODXUser } from '..'

/**
 * Авторизация
 */
export const signin: FieldResolver<'Mutation', 'signin'> = async (
  _,
  args,
  ctx
) => {
  const { login_context, password, username } = args

  const formBody = new URLSearchParams()

  formBody.append('login_context', login_context || 'mgr')
  formBody.append('username', username)
  formBody.append('password', password)
  formBody.append('login', '1')
  formBody.append('returnUrl', '/manager/')

  console.log('ctx.config.managerUrl', ctx.config.managerUrl)

  const result = await fetch(ctx.config.managerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    /**
     * Запрещаем редирект, так как иначе MODX в ответе присылает редирект
     * и выполняется за раз сразу два запроса.
     * При этом в последнем запросе прилетает кукис без авторизации. Нужен именно первый.
     */
    redirect: 'manual', // manual, *follow, error
    body: formBody,
  }).then(async (r) => {
    const setCookie = await r.headers.get('set-cookie')

    console.log('setCookie', setCookie)

    console.log('r.headers', r.headers)

    if (setCookie) {
      const PHPSESSID = setCookie
        .split(';')
        .find((n) => n.startsWith('PHPSESSID'))

      /**
       * Запрашиваем код админки, чтобы получить токен.
       * Приходится именно на страницу профиля заходить, чтобы найти ID текущего пользователя.
       */
      return await fetch(ctx.config.managerUrl + '?a=security/profile', {
        headers: {
          cookie: PHPSESSID || '',
        },
      }).then(async (r) => {
        const response2 = await r.text()

        console.log('response2', response2)

        /**
         * ищем в ответе токен
         */
        const tokenMatch = response2.match(/"?auth"?: ?"(.+?)"/)

        const token = tokenMatch && tokenMatch[1]

        console.log('token', token)

        /**
         * ищем в ответе ID пользователя. Без него мы не сможем получать объект текущего пользователя
         */
        const userIdMatch = response2.match(/user: "(\d+?)"/)

        const userId = userIdMatch && userIdMatch[1]

        console.log('userId', userId)

        if (token && userId) {
          /**
           * Устанавливаем куки авторизованного пользователя
           */
          ctx.res?.cookie(setCookie, undefined)

          return { token, userId: parseInt(userId) }
        }

        return null
      })
      // .catch(console.error)
    }
  })
  // .catch(console.error)

  if (!result) {
    throw new Error('Ошибка авторизации')
  }

  return result
}

/**
 * Пользователь
 */
export const user: FieldResolver<'Query', 'user' | 'me'> = async (
  _,
  args,
  ctx
) => {
  const { where } = args

  if (!where.id) {
    return null
  }

  const formBody = new URLSearchParams()

  formBody.append('action', 'Security/User/Get')

  type Name = keyof typeof where

  Object.keys(where).forEach((name) => {
    const value = where[name as Name]

    if (value !== null && value !== undefined) {
      formBody.append(name, value.toString())
    }
  })

  return ctx
    .connectorRequest<{
      object?: MODXUser
    }>(formBody, ctx)
    .then(async (r) => {
      return r.object || null
    })
}

/**
 * Список пользователей
 */
export const usersConnection: FieldResolver<
  'Query',
  'usersConnection'
> = async (_, { limit, start, where }, ctx) => {
  const formBody = new URLSearchParams()

  formBody.append('action', 'Security/User/GetList')

  type Name = keyof NonNullable<typeof where>

  where &&
    Object.keys(where).forEach((name) => {
      const value = where[name as Name]

      if (value !== null && value !== undefined) {
        formBody.append(name, value.toString())
      }
    })

  start && formBody.append('start', start.toString())
  limit && formBody.append('limit', limit.toString())

  const result = await ctx
    .connectorRequest<{
      results?: MODXListUser[]
    }>(formBody, ctx)
    .then(async (r) => {
      const users: NexusGenObjects['User'][] = []

      r.results?.forEach((n) => {
        if (n) {
          users.push(n)
        }
      })

      return {
        users,
        total: r.total || 0,
      }
    })

  return result
}
