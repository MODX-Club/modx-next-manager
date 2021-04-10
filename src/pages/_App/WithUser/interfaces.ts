import { MeQuery } from 'src/modules/gql/generated'
import { AuthFormProps } from './AuthForm/interfaces'

export type WithUserProps = AuthFormProps & {
  user: MeQuery['me']
}
