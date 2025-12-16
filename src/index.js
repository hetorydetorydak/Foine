import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@fontsource/marcellus-sc/400.css';
import '@fontsource/karla/400.css';
import '@fontsource/karma/400.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);