import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/userContext';
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
