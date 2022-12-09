import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CheckButton } from './Context/CheckButton';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CheckButton>
      <App />
    </CheckButton>
  </React.StrictMode>
);

