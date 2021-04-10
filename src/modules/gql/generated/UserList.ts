/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type UserListFragment = { __typename?: 'User', id: number, username: string, active: boolean, cls?: Types.Maybe<string> };

export const UserListFragmentDoc = gql`
    fragment UserList on User {
  id
  username
  active
  cls
}
    `;