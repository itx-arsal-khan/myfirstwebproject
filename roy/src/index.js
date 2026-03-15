import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/* CORE STYLES - Order Matters */
import './styles/design-system.css';  /* Variables first */
import './styles/animations.css';     /* Global keyframes */
import './styles/components.css';     /* UI Components (Buttons, Cards) */
import './styles/navbar.css';         /* Navigation specific */
import './styles/pages/auth.css';     /* Login/Register pages */
import './styles/pages/home.css';     /* Home page specific */
import './index.css';                 /* Global Resets & Overrides */

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();