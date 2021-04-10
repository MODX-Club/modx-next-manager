import styled, { css, createGlobalStyle } from 'styled-components'
import {
  FormControlStyled,
  FormControlLabelStyled,
  FormControlElementStyled,
} from '@procraft/ui/dist/components/form/FormControl/styles'
import { minWidth } from 'src/theme/helpers'

import bg from './img/default-background.jpg'

export const GlobalStyle = createGlobalStyle`

  body {
    background: url("${bg}") no-repeat center center;
    background-size: cover;
  }
 
 * {
    outline: none;
  }

  form, h1, h2, h3, h4, h5, h6, ol, p, ul {
    margin: 0;
    padding: 0;
    font-weight: 400;
    color: #343434;
  }

  h1 {
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
  }

`

export const AuthFormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img.logo {
    display: block;
    max-width: 100%;
    width: 12rem;
    margin: 1.5625rem 0 1rem;
  }
`

export const AuthFormContent = styled.div`
  h1 {
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
  }
  p {
    margin: 0 0 1rem;
    line-height: 1.4;
    &.lead {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }
`

export const AuthFormFields = styled.div`
  ${FormControlStyled} {
    ${FormControlLabelStyled} {
      color: #343434;
    }

    ${FormControlElementStyled} {
      border-radius: 3px;

      input {
        border: 1px solid #e4e4e4;
        display: inline-block;
        width: 100%;
        background: #fbfbfb;
        font-size: 1rem;
        padding: 1rem;
        box-shadow: none;
      }
    }
  }
`

export const AuthFormError = styled.p`
  color: #cf1124;
  border-left: 0.2rem solid #cf1124;
  padding: 1rem 1.2rem;
  border-radius: 3px;
  background-color: #fee;
  margin: 0 0 1rem;
  line-height: 1.4;
`

export const AuthFormStyled = styled.form`
  border: 2px;

  ${AuthFormFields} {
    margin: 30px 0;
  }

  button {
    border: 1px solid #568e3b;

    &[type='submit'] {
      border: 1px solid transparent;
      display: block;
      width: 100%;
      margin: 1rem 0;
      padding: 1rem;
      background: #6cb24a;
      border-radius: 3px;
      color: #fff;
      text-align: center;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease-out;

      &:hover {
        box-shadow: none;
        background: #528738;
      }
    }
  }
`

export const AuthFormWrapperStyled = styled.div`
  height: 100vh;
  display: flex;
  /* flex-direction: column; */

  /* align-items: center;
  justify-content: center; */

  ${AuthFormStyled} {
    padding: 0 3.125rem;
    position: relative;
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100%;

    ${minWidth.sm(css`
      max-width: 30rem;
    `)}
  }
`
