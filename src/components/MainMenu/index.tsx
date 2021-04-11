import React, { useCallback, useMemo } from 'react'
import { MainMenuStyled } from './styles'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'

const MainMenu: React.FC = () => {
  const client = useApolloClient()

  const logout = useCallback(() => {
    global.localStorage?.removeItem('token')

    client.resetStore().catch(console.error)
  }, [client])

  return useMemo(() => {
    return (
      <MainMenuStyled>
        <Link href="/">
          <a title="Главная">Главная</a>
        </Link>
        <Link href="/users">
          <a title="Пользователи">Пользователи</a>
        </Link>

        <div className="separator"></div>

        <button onClick={logout}>Logout</button>
      </MainMenuStyled>
    )
  }, [logout])
}

export default MainMenu
