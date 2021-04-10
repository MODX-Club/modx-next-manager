import styled from 'styled-components'

export type GridTableAttributeStyledProps = {
  /**
   * Лейбл
   */
  ['data-label']?: string
}

export const GridTableAttributeStyled = styled.div<GridTableAttributeStyledProps>`
  @media screen and (max-width: ${({ theme }) =>
      `${theme.breakpoints.sm - 1}px`}) {
    border-bottom: 1px solid lightgrey;

    &::before {
      content: attr(data-label);
    }
  }
`
