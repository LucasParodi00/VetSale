import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store';

import './styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={ store }>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
