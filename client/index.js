import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Container/Main';
import { ContextProvider } from './Components/SocketContext';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: 'Josefin Sans, sans-serif',
    },
    p: {
      fontFamily: 'Playfair Display, serif',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ContextProvider>
      <Main />
    </ContextProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
