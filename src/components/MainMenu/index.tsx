import React, { useMemo } from 'react'
import { MainMenuStyled } from './styles'
import Link from 'next/link'

const MainMenu: React.FC = () => {
  return useMemo(() => {
    return (
      <MainMenuStyled>
        <Link href="/">
          <a title="Главная">Главная</a>
        </Link>
        <Link href="/users">
          <a title="Пользователи">Пользователи</a>
        </Link>
      </MainMenuStyled>
    )
  }, [])
}

export default MainMenu
