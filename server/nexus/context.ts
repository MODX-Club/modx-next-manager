import { ExpressContext } from 'apollo-server-express'
import config from '../config'

export interface ApiContext {
  req?: ExpressContext['req']
  res?: ExpressContext['res']
  config: typeof config
}

export const context: ApiContext = {
  config,
}
