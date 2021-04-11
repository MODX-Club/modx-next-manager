import Link from 'next/link'
import React, { useMemo } from 'react'
import {
  GridTableAttributeStyled,
  GridTableItemStyled,
} from 'src/components/ui/GridTable/styles'
import { UsersViewUserProps } from './interfaces'

const UsersViewUser: React.FC<UsersViewUserProps> = ({ user }) => {
  return useMemo(() => {
    return (
      <>
        <GridTableItemStyled className={user.cls || undefined}>
          <GridTableAttributeStyled> {user.id}</GridTableAttributeStyled>
          <GridTableAttributeStyled>
            {' '}
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </GridTableAttributeStyled>
          <GridTableAttributeStyled> {user.fullname}</GridTableAttributeStyled>
          <GridTableAttributeStyled> {user.email}</GridTableAttributeStyled>
          <GridTableAttributeStyled>
            {' '}
            {user.active ? 'Yes' : 'No'}
          </GridTableAttributeStyled>
        </GridTableItemStyled>
      </>
    )
  }, [user])
}

export default UsersViewUser
