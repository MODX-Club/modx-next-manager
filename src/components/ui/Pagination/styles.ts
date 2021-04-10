import styled from 'styled-components'

export const PaginationStyled = styled.nav`
  display: flex;

  .row {
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
  }

  .control {
    border-right: 1px solid #ddd;

    &:last-child {
      border-right: none;
    }

    > * {
      display: block;
      padding: 8px 12px;
      /* border: 1px solid #ddd; */
      /* margin-left: 3px;
      margin-right: 3px; */
      text-decoration: none;
    }
  }

  a {
    &.active {
      background: #ddd;
    }

    &:hover {
      background: #dfdfdf;
    }
  }
`
