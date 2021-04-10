import React, { useCallback, useMemo, useState } from 'react'
import NextApp, { AppContext } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import theme from 'src/theme'
import { useApollo, initializeApollo } from 'src/lib/apolloClient'
import {
  AppProps,
  MainApp,
  AppInitialPropsCustom,
  NextPageContextCustom,
} from './interfaces'
import { NextSeo, NextSeoProps } from 'next-seo'
import Page404 from '../_Error/404'
import ErrorPage from '../_Error'
import { GlobalStyle } from 'src/theme/GlobalStyle'
import WithUser from './WithUser'
import { Context, ContextValue } from './Context'
import { useMeQuery } from 'src/modules/gql/generated'
import { AuthFormProps } from './WithUser/AuthForm/interfaces'

const withWs = false

const App: MainApp<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState, withWs)

  const { statusCode } = pageProps

  const [userId, userIdSetter] = useState<number | null>(
    parseInt(global.localStorage?.getItem('userId') || '') || null
  )

  const onAuthSuccess: AuthFormProps['onAuthSuccess'] = useCallback(
    (data) => {
      /**
       * Устанавливаем значения хранилища
       */
      global.localStorage?.setItem('token', data.token)
      global.localStorage?.setItem('userId', data.userId.toString())

      userIdSetter(data.userId)

      try {
        apolloClient.resetStore()
      } catch (error) {
        console.error(error)
      }
    },
    [apolloClient]
  )

  // TODO Надо проработать перезапрос пользователя.
  /**
   * Дело в том, что сейчас у нас не передаются параметры в запрос
   * и по этой причине даже при изменении токена в глобальном сторе
   * у нас не выполняется новый запрос на сервер.
   * Сейчас это у нас решается сбросом всего хранилища аполло-клиента при авторизации.
   * Надо будет подумать стоил ли перевести на useCallback и fetchPolicy: network-only
   */
  const { data: meQueryData } = useMeQuery({
    // skip: !userId || typeof window === "undefined",
    // onCompleted: (data) => {
    //   /**
    //    * Здесь у нас не срабатывает при авторизации, так как данные обновляются
    //    * через client.resetStore(). Там данные запрашиваются прямым запросом
    //    * и вливаются в кеш. Здесь после этого выполнение происходит без
    //    * запроса на сервер, так как данные из кеша берутся, соответственно и этот
    //    * метод не выполняется.
    //    */
    // },
    client: apolloClient,
    variables: {
      where: {
        id: userId || 0,
      },
    },
  })

  const user = meQueryData?.me

  const context = useMemo<ContextValue>(() => {
    return {
      user,
    }
  }, [user])

  const content = useMemo(() => {
    const meta: NextSeoProps = {}

    let content = null

    /**
     * If got error code, show error page instead
     */
    if (statusCode && statusCode !== 200) {
      switch (statusCode) {
        case 404:
          meta.noindex = true
          meta.nofollow = true

          content = <Page404 {...pageProps} />

          break

        default:
          content = <ErrorPage statusCode={statusCode} {...pageProps} />
      }
    } else {
      /**
       * If OK, show page Component
       */
      content = (
        <WithUser user={user} onAuthSuccess={onAuthSuccess}>
          <Component {...pageProps} />
        </WithUser>
      )
    }

    return (
      <>
        <NextSeo {...meta} />
        {content}
      </>
    )
  }, [statusCode, pageProps, user, onAuthSuccess])

  return (
    <>
      <Context.Provider value={context}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ApolloProvider client={apolloClient}>{content}</ApolloProvider>
        </ThemeProvider>
      </Context.Provider>
    </>
  )
}

/**
 * This method calls both of back and front side.
 * Usefull for check access or/and data.
 * Add getInitialProps to page Component
 * and return {statusCode: 404} or {statusCode: 403} for example.
 */
App.getInitialProps = async (appContext: AppContext) => {
  /**
   * Initialize apollo-client and path into page props for collect
   * all data in cache.
   */
  const apolloClient = initializeApollo({
    withWs,
    appContext,
  })

  /**
   * Передаваемый далее в страницу контекст
   */
  const ctx: NextPageContextCustom = {
    ...appContext.ctx,
    apolloClient,
  }

  const newAppContext = {
    ...appContext,
    ctx,
  }

  /**
   * Call final _App.getInitialProps, _Document.getInitialProps() and page.getInitialProps()
   */
  const appProps = await NextApp.getInitialProps(newAppContext)

  const { pageProps, ...otherProps } = appProps

  const newProps: AppInitialPropsCustom = {
    ...otherProps,
    pageProps: {
      ...pageProps,
      initialApolloState: apolloClient.cache.extract(),
    },
  }

  /**
   * Got server statusCode
   */
  const { statusCode } = newProps.pageProps

  /**
   * If server-side, add response http code
   */
  if (statusCode && statusCode !== 200 && newAppContext.ctx.res) {
    newAppContext.ctx.res.statusCode = statusCode
  }

  return newProps
}

export default App
