import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useMemo } from 'react'
import {
  UserWhereInput,
  useUsersConnectionQuery,
} from 'src/modules/gql/generated'
import { Page } from '../_App/interfaces'
import UsersView from './View'

function getQueryParams(query: ParsedUrlQuery) {
  let skip: number | undefined

  const first = 10

  const page =
    (query.page && typeof query.page === 'string' && parseInt(query.page)) || 0

  if (page > 1) {
    skip = (page - 1) * first
  }

  const where: UserWhereInput = {
    query:
      query.query && typeof query.query === 'string' ? query.query : undefined,
  }

  return {
    page,
    start: skip,
    limit: first,
    where,
  }
}

const UsersPage: Page = () => {
  const router = useRouter()

  const { page, ...variables } = useMemo(() => {
    return {
      ...getQueryParams(router.query),
    }
  }, [router.query])

  const data = useUsersConnectionQuery({
    variables,
  })

  return useMemo(() => {
    return (
      <>
        <NextSeo title="Пользователи" />

        <UsersView
          users={data.data?.usersConnection.users || []}
          variables={data.variables}
          pagination={{
            limit: data.variables?.limit || 0,
            total: data.data?.usersConnection.total || 0,
            page,
          }}
        />
      </>
    )
  }, [
    data.data?.usersConnection.total,
    data.data?.usersConnection.users,
    data.variables,
    page,
  ])
}

export default UsersPage
