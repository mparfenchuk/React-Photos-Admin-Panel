import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import store from './ducks/store';
import MainPage from './components/MainPage';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
          'Muli',
          'sans-serif'
        ].join(','),
    }
});

const App: React.FC = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <MainPage />
        </ThemeProvider>
    </Provider>
);

export default App;
