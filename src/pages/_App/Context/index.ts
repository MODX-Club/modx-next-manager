import React from 'react'
import { MeQuery } from 'src/modules/gql/generated'

export type ContextValue = {
  user: MeQuery['me']
}

export const Context = React.createContext<ContextValue | null>(null)
