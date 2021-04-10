/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import { UserFragment } from './User';
import { gql } from '@apollo/client';
import { UserFragmentDoc } from './User';
export type MeUserFragment = (
  { __typename?: 'User' }
  & UserFragment
);

export const MeUserFragmentDoc = gql`
    fragment MeUser on User {
  ...User
}
    ${UserFragmentDoc}`;