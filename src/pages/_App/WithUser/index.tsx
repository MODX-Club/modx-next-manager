import React, { useMemo } from 'react'

import AuthForm from './AuthForm'

import { WithUserProps } from './interfaces'
import useSubscriptionProvider from './useSubscriptionProvider'

const WithUser: React.FC<WithUserProps> = ({
  children,
  user,
  onAuthSuccess,
}) => {
  useSubscriptionProvider({})

  return useMemo(() => {
    /**
     * Если пользователь не авторизован, выводим форму авторизации
     */
    if (!user) {
      return <AuthForm onAuthSuccess={onAuthSuccess} />
    }

    return <>{children}</>
  }, [children, onAuthSuccess, user])
}

export default WithUser
