import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useMemo } from 'react'
import TextField from 'src/components/ui/form/TextField'
import {
  GridTableAttributeStyled,
  GridTableItemStyled,
  GridTableStyled,
} from 'src/components/ui/GridTable/styles'
import Pagination from 'src/components/ui/Pagination'
import { ToolbarStyled } from 'src/pages/styles'
import { UsersViewProps } from './interfaces'
import { UsersViewStyled } from './styles'
import UsersViewUser from './User'
import URI from 'urijs'

const UsersView: React.FC<UsersViewProps> = ({
  users,
  pagination,
  variables,
}) => {
  const router = useRouter()

  const onChangeWhere = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name
      const value = event.target.value

      const uri = new URI()

      uri.setQuery({
        page: undefined,
        [name]: value || undefined,
      })

      router.push(uri.toString())
    },
    [router]
  )

  const toolbar = useMemo(() => {
    return (
      <ToolbarStyled>
        <TextField
          name="query"
          onChange={onChangeWhere}
          title="Поиск"
          value={variables?.where?.query || ''}
        />
      </ToolbarStyled>
    )
  }, [onChangeWhere, variables?.where?.query])

  return useMemo(() => {
    return (
      <>
        <UsersViewStyled>
          {toolbar}

          <GridTableStyled>
            <GridTableItemStyled>
              <GridTableAttributeStyled>ID</GridTableAttributeStyled>
              <GridTableAttributeStyled>Username</GridTableAttributeStyled>
              <GridTableAttributeStyled>Fullname</GridTableAttributeStyled>
              <GridTableAttributeStyled>Email</GridTableAttributeStyled>
              <GridTableAttributeStyled>Active</GridTableAttributeStyled>
            </GridTableItemStyled>

            {users.map((n) => {
              return <UsersViewUser key={n.id} user={n} />
            })}
          </GridTableStyled>

          <Pagination {...pagination} />
        </UsersViewStyled>
      </>
    )
  }, [pagination, toolbar, users])
}

export default UsersView
