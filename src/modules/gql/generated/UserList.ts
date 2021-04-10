/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type UserListFragment = { __typename?: 'User', id: number, username: string, fullname?: Types.Maybe<string>, email?: Types.Maybe<string>, active: boolean, blocked: boolean, createdon: globalThis.Date, cls?: Types.Maybe<string> };

export const UserListFragmentDoc = gql`
    fragment UserList on User {
  id
  username
  fullname
  email
  active
  blocked
  createdon
  cls
}
    `;