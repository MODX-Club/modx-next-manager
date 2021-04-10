/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserListFragment } from './UserList';
import { gql } from '@apollo/client';
import { UserListFragmentDoc } from './UserList';
import * as Apollo from '@apollo/client';
export type UsersConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UserWhereInput>;
  start?: Types.Maybe<Types.Scalars['Int']>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type UsersConnectionQuery = { __typename?: 'Query', usersConnection: { __typename?: 'UsersConnectionResponse', total: number, users: Array<(
      { __typename?: 'User' }
      & UserListFragment
    )> } };


export const UsersConnectionDocument = gql`
    query usersConnection($where: UserWhereInput, $start: Int, $limit: Int) {
  usersConnection(where: $where, start: $start, limit: $limit) {
    total
    users {
      ...UserList
    }
  }
}
    ${UserListFragmentDoc}`;

/**
 * __useUsersConnectionQuery__
 *
 * To run a query within a React component, call `useUsersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      start: // value for 'start'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUsersConnectionQuery(baseOptions?: Apollo.QueryHookOptions<UsersConnectionQuery, UsersConnectionQueryVariables>) {
        return Apollo.useQuery<UsersConnectionQuery, UsersConnectionQueryVariables>(UsersConnectionDocument, baseOptions);
      }
export function useUsersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersConnectionQuery, UsersConnectionQueryVariables>) {
          return Apollo.useLazyQuery<UsersConnectionQuery, UsersConnectionQueryVariables>(UsersConnectionDocument, baseOptions);
        }
export type UsersConnectionQueryHookResult = ReturnType<typeof useUsersConnectionQuery>;
export type UsersConnectionLazyQueryHookResult = ReturnType<typeof useUsersConnectionLazyQuery>;
export type UsersConnectionQueryResult = Apollo.QueryResult<UsersConnectionQuery, UsersConnectionQueryVariables>;