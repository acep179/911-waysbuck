import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/userContext';
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import App from './App';
import { CartContextProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
