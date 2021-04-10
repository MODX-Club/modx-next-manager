import { SigninMutation } from 'src/modules/gql/generated'

export type AuthFormProps = {
  onAuthSuccess: (data: NonNullable<SigninMutation['signin']>) => void
}
