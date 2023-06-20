

import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  primaryColor: '#1a1a1a',
  secondaryColor: '#2b2b2b',
  textColor: '#ffffff',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${darkTheme.primaryColor};
    color: ${darkTheme.textColor};
  }
`;
