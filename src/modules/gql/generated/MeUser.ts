/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import { UserObjectFragment } from './UserObject';
import { gql } from '@apollo/client';
import { UserObjectFragmentDoc } from './UserObject';
export type MeUserFragment = (
  { __typename?: 'User' }
  & UserObjectFragment
);

export const MeUserFragmentDoc = gql`
    fragment MeUser on User {
  ...UserObject
}
    ${UserObjectFragmentDoc}`;