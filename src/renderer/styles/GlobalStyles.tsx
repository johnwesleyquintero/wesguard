import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import { useSystemInfoContext } from '../context/SystemInfoContext';

// Define the props for the styled component
interface StyledGlobalProps {
  themeMode: 'light' | 'dark';
}

// Create the styled component
const StyledGlobal = createGlobalStyle<StyledGlobalProps>`
  body {
    background-color: ${(props) => theme[props.themeMode].colors.background};
    color: ${(props) => theme[props.themeMode].colors.text};
    font-family: ${(props) => theme[props.themeMode].fonts.main};
    margin: 0;
    padding: 0;
  }

  .app {
    display: flex;
    height: 100vh;
  }

  .main-content {
    flex-grow: 1;
    padding: ${(props) => theme[props.themeMode].spacing.md};
    overflow-y: auto;
  }
`;

// Component that uses the context and renders the styled component
export const GlobalStyles: React.FC = () => {
  const { themeMode } = useSystemInfoContext();
  // Provide themeMode as a prop to StyledGlobal
  return <StyledGlobal themeMode={themeMode || 'light'} />;
};
