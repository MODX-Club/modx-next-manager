/* eslint-disable no-console */
import { ExpressContext } from 'apollo-server-express'
import config from '../config'
import { MODXUser } from './types'

export type MODXResponse = {
  success: boolean
  message: string | undefined
  total: number
  // data?: Array<Record<string, unknown> | null | undefined>
  // results?: Array<Record<string, unknown> | null | undefined>
  object?: {
    code?: number
  }
}

/**
 * Запрос на MODX коннектор
 */
function connectorRequest<T>(body: URLSearchParams, ctx: ApiContext) {
  const result = fetch(ctx.config.connectorsrUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: ctx.req?.headers.cookie || '',
      modAuth: ctx.req?.headers.authorization || '',
    },
    body,
  }).then(async (r) => {
    const response = await r.text()

    try {
      const data: MODXResponse & T = JSON.parse(response)

      console.log('data', data)

      // if (data.object?.code && data.object?.code !== 200) {
      //   ctx.res?.status(data.object?.code);
      //   throw new Error(data.message || "Request error")
      // }
      // else
      if (data.success === false) {
        throw new Error(data.message || 'Request error')
      }

      return data
    } catch (error) {
      console.error(error)
      throw new Error(error.message || 'Ошибка выполнения запроса')
    }
  })

  return result
}

export interface ApiContext {
  req?: ExpressContext['req']
  res?: ExpressContext['res']
  config: typeof config
  connectorRequest: typeof connectorRequest
  user: MODXUser | null
}

export const context: ApiContext = {
  config,
  connectorRequest,
  user: null,
}
