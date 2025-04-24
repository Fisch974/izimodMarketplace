import './bootstrap.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

//  Clé d'authentification -- DEV MODE -- à retirer en prod
const CLIENT_ID = "590740222974-v7tac64qquf57j7ei45i0e4tgnn7n3gt.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
