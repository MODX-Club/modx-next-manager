import { useCallback, useEffect } from 'react'

import gql from 'graphql-tag'
import { SubscriptionProviderProps } from './interfaces'
import { useApolloClient } from '@apollo/client'

const useSubscriptionProvider = (_: SubscriptionProviderProps) => {
  const client = useApolloClient()

  const resetStore = useCallback(() => {
    // TODO Эта проверка сильно снижает риск возникновения ошибки запроса,
    // но из-за замыкания срабатывает раз в два. Надо будет перепроверить.
    if (!client['queryManager'].fetchCancelFns.size) {
      client.resetStore().catch(console.error)
    }
  }, [client])

  useEffect(() => {
    /**
     * Run on browser side only
     */
    if (typeof window === 'undefined') {
      return
    }

    const nodes: string[] = []

    const subscriptions: ZenObservable.Subscription[] = []

    nodes.forEach((n) => {
      const subscription = client
        .subscribe({
          query: gql`
          subscription {
            ${n} {
              mutation
              node {
                id
              }
            }
          }
        `,
        })
        .subscribe({
          next: () => {
            resetStore()
          },
          error(error: Error) {
            console.error('subscribeCalls callback with error: ', n, error)
          },
        })

      subscriptions.push(subscription)
    })

    return () => {
      /**
       * Unsubscribe all
       */
      subscriptions.map((n) => {
        n.unsubscribe()
      })
    }
  }, [client, resetStore])
}

export default useSubscriptionProvider
