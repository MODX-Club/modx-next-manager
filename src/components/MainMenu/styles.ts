import styled from 'styled-components'

export const MainMenuStyled = styled.nav`
  background: #234368;
  padding: 10px 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
  }

  > * {
    margin: 0 20px;
  }

  .separator {
    flex: 1;
  }

  button {
    cursor: pointer;
  }
`
