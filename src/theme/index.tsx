import UiTheme from '@procraft/ui/dist/theme'

/**
 * Размеры экранов
 */
const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1920,
}

/**
 * Цвета
 */
const colors = {
  primary: '#333',
}

/**
 * Итоговая тема
 */
const theme = {
  ui: {
    ...UiTheme.ui,
  },
  colors,
  breakpoints,
}

export type Theme = typeof theme

// props that later will be injected by styled-components
export type ThemeProps = { theme?: Theme }

export default theme
