import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { useTypedController } from '@hookform/strictly-typed'
import {
  SigninMutationVariables,
  useSigninMutation,
} from 'src/modules/gql/generated'
import TextField from 'src/components/ui/form/TextField'
import {
  GlobalStyle,
  AuthFormContent,
  AuthFormError,
  AuthFormFields,
  AuthFormHeader,
  AuthFormStyled,
  AuthFormWrapperStyled,
} from './styles'

import logo from './img/modx-logo-color.svg'
import { AuthFormProps } from './interfaces'

yup.setLocale({
  mixed: {
    default: 'Ошибка заполнения',
    required: 'Обязательное поле',
  },
  string: {
    required: 'Обязательное поле',
    // email: 'Введите корректный емейл',
  },
})

/**
 * Типизация данных формы из типов API
 */
export type AuthFormSchema = SigninMutationVariables

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess, ...other }) => {
  const [error, setError] = useState<Error | null>(null)

  const schema = useMemo(() => {
    /**
     * Описываем структуру формы в соответствии с типизацией
     */
    const schema: SchemaOf<AuthFormSchema> = yup
      .object({
        // eslint-disable-next-line @typescript-eslint/camelcase
        login_context: yup.string(),
        username: yup.string().required(),
        password: yup.string().required(),
      })
      .defined()
    // .default({
    //   username: '',
    // })

    return schema
  }, [])

  const {
    handleSubmit,
    control,
    errors,
    // clearErrors,
    // formState,
  } = useForm<AuthFormSchema>({
    resolver: yupResolver(schema),
  })

  // console.log('errors', errors);
  // console.log('control', control);

  const [signinMutation, { loading: inRequest }] = useSigninMutation()

  /**
   * Авторизация
   */
  const onSubmit = handleSubmit((data) => {
    if (inRequest) {
      return
    }

    if (error) {
      setError(null)
    }

    /**
     * Выполняем запрос
     */
    signinMutation({
      variables: data,
    })
      .then((r) => {
        if (r.data?.signin) {
          /**
           * Если запрос выполнился успешно, устанавливаем токен и сбрасываем стор
           */

          onAuthSuccess(r.data?.signin)
        }
        // else {
        //   setError(new Error('Ошибка выполнения запроса'))
        // }
      })
      .catch(setError)
  })

  const TypedController = useTypedController<AuthFormSchema>({
    control,
  })

  return useMemo(() => {
    const fields: JSX.Element[] = []

    {
      const name = 'username'

      const error = errors[name]

      fields.push(
        <TypedController
          key={name}
          name={[name]}
          defaultValue=""
          // eslint-disable-next-line react/jsx-no-bind
          render={(_props) => {
            return (
              <TextField
                name={name}
                value={_props.value || ''}
                onChange={_props.onChange}
                title={'Логин'}
                fullWidth
                error={error}
              />
            )
          }}
        />
      )
    }

    {
      const name = 'password'

      const error = errors[name]

      fields.push(
        <TypedController
          key={name}
          name={[name]}
          defaultValue=""
          // eslint-disable-next-line react/jsx-no-bind
          render={(_props) => {
            return (
              <TextField
                name={name}
                value={_props.value || ''}
                onChange={_props.onChange}
                title={'Пароль'}
                fullWidth
                error={error}
                type="password"
              />
            )
          }}
        />
      )
    }

    return (
      <>
        <GlobalStyle />
        <AuthFormWrapperStyled {...other}>
          <AuthFormStyled onSubmit={onSubmit}>
            <AuthFormHeader>
              <img src={logo} className="logo" alt="logo" />
            </AuthFormHeader>

            <AuthFormContent>
              <h1>
                <strong>Здравствуйте!</strong> Рады вас видеть!
              </h1>

              <p className="lead">
                Пожалуйста, войдите, чтобы получить доступ к панели управления.
              </p>
            </AuthFormContent>

            {error ? <AuthFormError>{error.message}</AuthFormError> : null}

            <AuthFormFields>{fields}</AuthFormFields>

            <button type="submit" disabled={inRequest}>
              Отправить
            </button>
          </AuthFormStyled>
        </AuthFormWrapperStyled>
      </>
    )
  }, [error, errors, onSubmit, inRequest, other])
}

export default AuthForm
