import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Container/Main';
import { ContextProvider } from './Components/SocketContext';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  shadows: ['none'],
  typography: {
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#221f20',
    },
    secondary: {
      main: '#f7e383',
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
