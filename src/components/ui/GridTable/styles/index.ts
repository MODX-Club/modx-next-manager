/**
 * Based on https://www.freecodecamp.org/news/https-medium-com-nakayama-shingo-creating-responsive-tables-with-pure-css-using-the-grid-layout-module-8e0ea8f03e83/
 */

import styled from 'styled-components'
import { GridTableAttributesContainerStyled } from './GridTableAttributesContainerStyled'
import { GridTableAttributeStyled } from './GridTableAttributeStyled'
import { GridTableItemStyled } from './GridTableItemStyled'

export {
  GridTableAttributesContainerStyled,
  GridTableAttributeStyled,
  GridTableItemStyled,
}

export const GridTableStyled = styled.ol`
  margin: 0px;
  padding: 0px;

  > ${GridTableItemStyled} {
    list-style: none;

    &:first-child {
      background-color: blanchedalmond;
      border-top: 1px solid gray;
    }
  }

  /* 1 Column Card Layout */
  @media screen and (max-width: ${({ theme }) =>
      `${theme.breakpoints.sm - 1}px`}) {
    display: grid;
    grid-template-columns: 1fr;

    > ${GridTableItemStyled} {
      border: 1px solid gray;
      border-radius: 2px;
      padding: 10px;

      /* Don't display the first item, since it is used to display the header for tabular layouts*/
      /* &:first-child {
        display: none;
      } */
    }
  }

  /* Tabular Layout */
  /* @media screen and (min-width: 737px) { */
  @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    /* The maximum column width, that can wrap */
    > ${GridTableItemStyled} {
      display: grid;
      /* grid-template-columns: 2em 2em 10fr 2fr 2fr 2fr 2fr 5em 5em; */
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

      &:first-child {
        /* background-color: blanchedalmond;
        border-top: 1px solid gray; */

        /* Center header labels */
        ${GridTableAttributeStyled} {
          display: flex;
          align-items: center;
          justify-content: center;
          text-overflow: initial;
          overflow: auto;
          white-space: normal;
        }
      }

      > ${GridTableAttributeStyled} {
        &:first-child {
          border-left: 1px solid gray;
        }
      }
    }

    /* In order to maximize row lines, only display one line for a cell */
    ${GridTableAttributeStyled} {
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
      padding: 2px;
      /* overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; */
    }
  }
`
