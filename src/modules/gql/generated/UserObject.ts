/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import { UserListFragment } from './UserList';
import { gql } from '@apollo/client';
import { UserListFragmentDoc } from './UserList';
export type UserObjectFragment = (
  { __typename?: 'User' }
  & UserListFragment
);

export const UserObjectFragmentDoc = gql`
    fragment UserObject on User {
  ...UserList
}
    ${UserListFragmentDoc}`;