import styled from 'styled-components'

export const GridTableAttributesContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--column-width-min), 1fr));
`
