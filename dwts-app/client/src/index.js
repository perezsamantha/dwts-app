import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { reducers } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark'
    // primary: {
    //   main: 'rgb(18, 18, 18)'
    // },
    // secondary: {
    //   main: 'rgb(179, 179, 179)'
    // },
    // text: {
    //   primary: 'rgb(179, 179, 179)',
    //   secondary: '#ffffff'
    // }
  },
  typography: {
    fontFamily: [
      'Urbanist',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  // components: {
  //   MuiDataGrid: {
  //     styleOverrides: {
  //       columnHeader: {
  //         color: 'white',
  //       },
  //       filterForm: {
  //         backgroundColor: 'black'
  //       }
  //     }
  //   }
  // }
  // overrides: {
  //   MuiSlider: {
  //     thumb: {
  //       color: "rgb(243,229,171)",
  //     },
  //     track: {
  //       color: "rgb(243,229,171)",
  //     },
  //     rail: {
  //       color: "rgb(243,229,171)",
  //     },
  //     valueLabel: {
  //       "& > span > span": {
  //         color: "black"
  //       }
  //     }
  //   },
  // }
})

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

//const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

ReactDOM.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={muiTheme}> */}
    <App />
    {/* </ThemeProvider> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
