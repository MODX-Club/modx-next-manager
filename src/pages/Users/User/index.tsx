import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useUserQuery } from 'src/modules/gql/generated'
import { Page } from 'src/pages/_App/interfaces'

const UserPage: Page = () => {
  const router = useRouter()

  const userId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : null

  const response = useUserQuery({
    skip: !userId,
    variables: {
      where: {
        id: userId || 0,
      },
    },
  })

  const user = response.data?.user

  return useMemo(() => {
    if (!user) {
      return null
    }

    return <>{user.username}</>
  }, [user])
}

export default UserPage
