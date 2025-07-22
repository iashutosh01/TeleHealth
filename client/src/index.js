import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="841999048069-6m0v8ir43pu6gs32895rpgcc16p6hb1t.apps.googleusercontent.com">
    <App />
    
  </GoogleOAuthProvider>
);
