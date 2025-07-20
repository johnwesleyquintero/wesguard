import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme.colors.light};
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.main};
    margin: 0;
    padding: 0;
  }

  .app {
    display: flex;
    height: 100vh;
  }

  .main-content {
    flex-grow: 1;
    padding: ${theme.spacing.md};
    overflow-y: auto;
  }
`;
