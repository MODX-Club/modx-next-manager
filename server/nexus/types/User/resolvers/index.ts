/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-console */
import { FieldResolver } from 'nexus'

/**
 * Авторизация
 */
export const signin: FieldResolver<'Mutation', 'signin'> = async (
  _,
  args,
  ctx
) => {
  console.log('ctx.config', ctx.config)

  const { login_context, password, username } = args

  const formBody = new URLSearchParams()

  formBody.append('login_context', login_context || 'mgr')
  formBody.append('username', username)
  formBody.append('password', password)
  formBody.append('login', '1')
  formBody.append('returnUrl', '/manager/')

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
  })
    .then(async (r) => {
      const setCookie = await r.headers.get('set-cookie')

      console.log('signin setCookie', setCookie)

      if (setCookie) {
        const PHPSESSID = setCookie
          .split(';')
          .find((n) => n.startsWith('PHPSESSID'))

        /**
         * Запрашиваем код админки, чтобы получить токен
         */

        return await fetch(ctx.config.managerUrl, {
          headers: {
            cookie: PHPSESSID || '',
          },
        })
          .then(async (r) => {
            const response2 = await r.text()

            /**
             * ищем в ответе токен
             */
            const match = response2.match(/"auth":"(.+?)"/)

            const token = match && match[1]

            if (token) {
              /**
               * Устанавливаем куки авторизованного пользователя
               */
              ctx.res?.cookie(setCookie, undefined)
            }

            return token
          })
          .catch(console.error)
      }
    })
    .catch(console.error)

  if (!result) {
    throw new Error('Ошибка авторизации')
  }

  return result
}

/**
 * Список пользователей
 */

export const users: FieldResolver<'Query', 'users'> = async (_, _args, ctx) => {
  const formBody = new URLSearchParams()

  formBody.append('action', 'Security/User/GetList')
  formBody.append('start', '0')
  formBody.append('limit', '20')

  console.log('ctx.req?.headers.cookie', ctx.req?.headers.cookie)
  console.log('ctx.req?.signedCookies', ctx.req?.signedCookies)
  console.log('ctx.req?.headers.authorization', ctx.req?.headers.authorization)

  const result = fetch(ctx.config.connectorsrUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: ctx.req?.headers.cookie || '',
      modAuth: ctx.req?.headers.authorization || '',
    },
    body: formBody,
  }).then(async (r) => {
    const response = await r.text()

    console.log('users response', response)
    console.log('users response headers', r.headers)
    try {
      const data = JSON.parse(response)

      console.log('data', data)

      return data.results || []
    } catch (error) {
      throw new Error(error)
    }

    // return r;
  })
  // .catch(console.error)

  console.log('users result', result)

  return result
}
