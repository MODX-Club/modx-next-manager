import { PaginationProps } from 'src/components/ui/Pagination'
import { UsersConnectionQueryVariables } from 'src/modules/gql/generated'
import { UsersViewUserProps } from './User/interfaces'

export type UsersViewProps = {
  users: UsersViewUserProps['user'][]

  pagination: PaginationProps

  variables: UsersConnectionQueryVariables | undefined
}
