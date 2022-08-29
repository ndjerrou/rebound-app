import React, { FC, StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import tw from 'twin.macro';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import * as serviceWorker from './serviceWorker';
import { CartProvider } from './contexts';
import { defaultTheme } from './config/styles';
import { CURRENCY_CODE } from './constants/constants';
import Routes from './router/Routes';

import './assets/css/index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';

console.log(rbData);
const { payPalClientId } = rbData;

const ToastContainerStyles = styled(ToastContainer)`
  .Toastify__toast-container {
    ${tw``}
  }
  .Toastify__close-button {
    ${tw`text-white opacity-100 mr-1`}
  }
  .Toastify__toast {
    ${tw`bg-blue-rb-700 rounded-3xl`}
  }
  .Toastify__toast-body {
    ${tw`text-sm text-white font-rb-akira-sup`}
  }
  .Toastify__progress-bar {
    background: white;
  }
`;

const App: FC = () => (
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CartProvider>
        <PayPalScriptProvider
          options={{
            'client-id': payPalClientId,
            currency: CURRENCY_CODE,
          }}
        >
          <Router>
            <Routes />
          </Router>
          <ToastContainerStyles
            position="top-center"
            autoClose={5000}
            closeOnClick
            pauseOnHover
          />
        </PayPalScriptProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);

const container = document.querySelector('#app-root');

render(<App />, container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
